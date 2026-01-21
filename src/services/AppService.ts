import {NativeModules, Platform} from 'react-native';
import {App, AppUsage} from '../types/app.types';
import {StorageService} from './StorageService';

const {RNInstalledApplication} = NativeModules;

export class AppService {
  // Get list of installed apps
  static async getInstalledApps(): Promise<App[]> {
    try {
      if (Platform.OS === 'android') {
        const apps = await RNInstalledApplication.getApps();
        const sortedApps = apps.sort((a: App, b: App) =>
          a.appName.localeCompare(b.appName),
        );
        return sortedApps;
      }
      return [];
    } catch (error) {
      console.error('Error getting apps:', error);
      return [];
    }
  }

  // Launch an app
  static async launchApp(packageName: string): Promise<void> {
    try {
      // Track app usage
      const appUsage = await StorageService.getAppUsage();
      const newUsage = {
        ...appUsage,
        [packageName]: (appUsage[packageName] || 0) + 1,
      };
      await StorageService.setAppUsage(newUsage);

      // Launch app
      if (Platform.OS === 'android') {
        await RNInstalledApplication.launchApplication(packageName);
      }
    } catch (error) {
      console.error('Error launching app:', error);
    }
  }

  // Get usage count for an app
  static async getUsageCount(packageName: string): Promise<number> {
    const appUsage = await StorageService.getAppUsage();
    return appUsage[packageName] || 0;
  }

  // Toggle favorite status (limited to 5)
  static async toggleFavorite(packageName: string): Promise<string[]> {
    const favorites = await StorageService.getFavorites();
    let newFavorites = [...favorites];

    if (favorites.includes(packageName)) {
      // Remove from favorites
      newFavorites = newFavorites.filter(f => f !== packageName);
    } else {
      // Add to favorites (max 5)
      if (newFavorites.length < 5) {
        newFavorites.push(packageName);
      }
    }

    await StorageService.setFavorites(newFavorites);
    return newFavorites;
  }
}
