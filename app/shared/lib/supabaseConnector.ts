import {
	AbstractPowerSyncDatabase,
	BaseObserver,
	CrudEntry,
	PowerSyncBackendConnector,
	UpdateType,
	type PowerSyncCredentials,
} from "@powersync/web";
import { Session, SupabaseClient, createClient } from "@supabase/supabase-js";
import { env } from "./env";

export type SupabaseConfig = {
	supabaseUrl: string;
	supabaseAnonKey: string;
	powersyncUrl: string;
};

const FATAL_RESPONSE_CODES = [
	// Class 22 — Data Exception
	// Examples include data type mismatch.
	new RegExp("^22...$"),
	// Class 23 — Integrity Constraint Violation.
	// Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
	new RegExp("^23...$"),
	// INSUFFICIENT PRIVILEGE - typically a row-level security violation
	new RegExp("^42501$"),
];

export type SupabaseConnectorListener = {
	initialized: () => void;
	sessionStarted: (session: Session) => void;
};

export class SupabaseConnector
	extends BaseObserver<SupabaseConnectorListener>
	implements PowerSyncBackendConnector
{
	readonly client: SupabaseClient;
	readonly config: SupabaseConfig;

	ready: boolean;

	currentSession: Session | null;

	constructor() {
		super();
		this.config = {
			supabaseUrl: env.SUPABASE_URL,
			powersyncUrl: env.POWERSYNC_URL,
			supabaseAnonKey: env.SUPABASE_ANON_KEY,
		};

		this.client = createClient(this.config.supabaseUrl, this.config.supabaseAnonKey, {
			auth: {
				persistSession: true,
			},
		});
		this.currentSession = null;
		this.ready = false;
	}

	async init() {
		if (this.ready) {
			return;
		}

		const sessionResponse = await this.client.auth.getSession();
		this.updateSession(sessionResponse.data.session);

		this.ready = true;
		this.iterateListeners((cb) => cb.initialized?.());
	}

	async fetchCredentials() {
		const {
			data: { session },
			error,
		} = await this.client.auth.getSession();

		if (!session || error) {
			throw new Error(`Could not fetch Supabase credentials: ${error}`);
		}

		console.debug("session expires at", session.expires_at);

		return {
			endpoint: this.config.powersyncUrl,
			token: session.access_token ?? "",
		} satisfies PowerSyncCredentials;
	}

	async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
		const transaction = await database.getNextCrudTransaction();

		if (!transaction) {
			return;
		}

		let lastOp: CrudEntry | null = null;
		try {
			for (const op of transaction.crud) {
				lastOp = op;
				const table = this.client.from(op.table);
				let result: any;
				switch (op.op) {
					case UpdateType.PUT:
						const record = { ...op.opData, id: op.id };
						result = await table.upsert(record);
						break;
					case UpdateType.PATCH:
						result = await table.update(op.opData).eq("id", op.id);
						break;
					case UpdateType.DELETE:
						result = await table.delete().eq("id", op.id);
						break;
				}

				if (result.error) {
					console.error(result.error);
					result.error.message = `Could not update Supabase. Received error: ${result.error.message}`;
					throw result.error;
				}
			}

			await transaction.complete();
		} catch (ex: any) {
			console.debug(ex);
			if (typeof ex.code == "string" && FATAL_RESPONSE_CODES.some((regex) => regex.test(ex.code))) {
				console.error("Data upload error - discarding:", lastOp, ex);
				await transaction.complete();
			} else {
				throw ex;
			}
		}
	}

	updateSession(session: Session | null) {
		this.currentSession = session;
		if (!session) {
			return;
		}
		this.iterateListeners((cb) => cb.sessionStarted?.(session));
	}
}
