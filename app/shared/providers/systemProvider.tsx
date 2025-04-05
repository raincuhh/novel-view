import React, { createContext, Suspense, useContext, useEffect, useState } from "react";
import { SupabaseConnector } from "../lib/supabaseConnector";
import { PowerSyncDatabase } from "@powersync/web";
import { AppSchema } from "../lib/appSchema";
import { PowerSyncContext } from "@powersync/react";

const SupabaseContext = createContext<SupabaseConnector | null>(null);
export const useSupabase = () => useContext(SupabaseContext);

export const db = new PowerSyncDatabase({
	schema: AppSchema,
	database: {
		dbFilename: "main.db",
	},
});

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
	const [connector] = useState(new SupabaseConnector());
	const [powerSync] = useState(db);

	useEffect(() => {
		(window as any).__powersync = powerSync;

		powerSync.init();
		const listener = connector.registerListener({
			initialized: () => {},
			sessionStarted: () => {
				powerSync.connect(connector);
			},
		});

		connector.init();

		return () => listener?.();
	}, [powerSync, connector]);

	return (
		<PowerSyncContext.Provider value={powerSync}>
			<SupabaseContext.Provider value={connector}>{children}</SupabaseContext.Provider>
		</PowerSyncContext.Provider>
	);
};
