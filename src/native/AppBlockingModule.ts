import {NativeModules} from 'react-native';

interface AppBlockingModuleType {
  isAccessibilityServiceEnabled(): Promise<boolean>;
  requestAccessibilityPermission(): Promise<boolean>;
  setBlockedApps(packageNames: string[], reason: string): Promise<boolean>;
  addBlockedApp(packageName: string, reason: string): Promise<boolean>;
  removeBlockedApp(packageName: string): Promise<boolean>;
  clearBlockedApps(): Promise<boolean>;
  setBreakGlassPhrase(phrase: string): Promise<boolean>;
}

export const AppBlockingModule: AppBlockingModuleType =
  NativeModules.AppBlockingModule;
