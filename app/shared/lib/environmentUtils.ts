import { isTauri as packageIsTauri } from "@tauri-apps/api/core";
import { Capacitor } from "@capacitor/core";
import MobileDetect from "mobile-detect";

export const isTauri = async (): Promise<boolean> => {
   return await packageIsTauri();
};

export const isCapacitor = (): boolean => {
   return Capacitor.isNativePlatform();
};

export const getPlatform = async (): Promise<string> => {
   if (await isTauri()) return "tauri-desktop";
   if (isCapacitor()) return Capacitor.getPlatform();
   return "web";
};

export const isMobile = (): boolean => {
   const md = new MobileDetect(window.navigator.userAgent);
   return !!md.mobile() || isCapacitor();
};

export const isProd = (): boolean => {
   return process.env.MODE === "production";
};

export const isDev = (): boolean => {
   return process.env.MODE === "development";
};
