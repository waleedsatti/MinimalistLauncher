import {NativeModules} from 'react-native';

interface AppUsageStatsModuleType {
  hasUsageStatsPermission(): Promise<boolean>;
  requestUsageStatsPermission(): Promise<boolean>;
  getUsageStats(startDate: string, endDate: string): Promise<{
    [packageName: string]: {
      totalTimeInForeground: number;
      lastTimeUsed: number;
      firstTimeStamp: number;
      lastTimeStamp: number;
    };
  }>;
  getDailyUsage(date: string): Promise<{
    [packageName: string]: {
      totalTimeInForeground: number;
      lastTimeUsed: number;
    };
  }>;
  getTodayUsage(): Promise<{
    [packageName: string]: {
      totalTimeInForeground: number;
      lastTimeUsed: number;
    };
  }>;
}

export const AppUsageStatsModule: AppUsageStatsModuleType =
  NativeModules.AppUsageStatsModule;
