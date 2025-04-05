import React, { createContext, Suspense, useContext, useEffect, useState } from "react";
import { SupabaseConnector } from "../lib/supabaseConnector";
import { AppSchema } from "../lib/appSchema";
import { Capacitor } from "@capacitor/core";
import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase } from "@powersync/web";

const platform = Capacitor.getPlatform();
const isIOs = platform === "ios";
const useWebWorker = !isIOs;

const SupabaseContext = createContext<SupabaseConnector | null>(null);
export const useSupabase = () => useContext(SupabaseContext);

export const db = new PowerSyncDatabase({
	schema: AppSchema,
	database: {
		dbFilename: "main.db",
	},
});

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
	const [connector] = useState<SupabaseConnector>(new SupabaseConnector());
	const [powerSync, setPowerSync] = useState<InstanceType<typeof PowerSyncDatabase> | null>(null);

	useEffect(() => {
		(window as any)._powersync = powerSync;

		if (powerSync) powerSync.init();
	}, [powerSync]);

	if (!powerSync) {
		return <div>Loading...</div>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PowerSyncContext.Provider value={powerSync}>
				<SupabaseContext.Provider value={connector}>{children}</SupabaseContext.Provider>
			</PowerSyncContext.Provider>
		</Suspense>
	);
};
