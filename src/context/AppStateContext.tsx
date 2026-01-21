import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {App, AppUsage} from '../types/app.types';
import {AppService} from '../services/AppService';
import {StorageService} from '../services/StorageService';

interface AppStateContextType {
  installedApps: App[];
  favorites: string[];
  appUsage: AppUsage;
  loading: boolean;
  refreshApps: () => Promise<void>;
  toggleFavorite: (packageName: string) => Promise<void>;
  launchApp: (packageName: string) => Promise<void>;
  getUsageCount: (packageName: string) => number;
}

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined,
);

export function AppStateProvider({children}: {children: ReactNode}) {
  const [installedApps, setInstalledApps] = useState<App[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [appUsage, setAppUsage] = useState<AppUsage>({});
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load favorites and app usage from storage
      const [storedFavorites, storedUsage, apps] = await Promise.all([
        StorageService.getFavorites(),
        StorageService.getAppUsage(),
        AppService.getInstalledApps(),
      ]);

      setFavorites(storedFavorites);
      setAppUsage(storedUsage);
      setInstalledApps(apps);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshApps = async () => {
    const apps = await AppService.getInstalledApps();
    setInstalledApps(apps);
  };

  const toggleFavorite = async (packageName: string) => {
    const newFavorites = await AppService.toggleFavorite(packageName);
    setFavorites(newFavorites);
  };

  const launchApp = async (packageName: string) => {
    await AppService.launchApp(packageName);
    // Reload app usage to reflect the new launch
    const usage = await StorageService.getAppUsage();
    setAppUsage(usage);
  };

  const getUsageCount = (packageName: string): number => {
    return appUsage[packageName] || 0;
  };

  return (
    <AppStateContext.Provider
      value={{
        installedApps,
        favorites,
        appUsage,
        loading,
        refreshApps,
        toggleFavorite,
        launchApp,
        getUsageCount,
      }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
