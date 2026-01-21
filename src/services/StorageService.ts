import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppUsage,
  DailyIntention,
  FocusModeConfig,
  BlockRule,
  PartnerConfig,
  PartnerProgress,
  AppSettings,
} from '../types/app.types';

export class StorageService {
  // Storage keys
  private static readonly KEYS = {
    FAVORITES: 'favorites',
    APP_USAGE: 'appUsage',
    INTENTIONS: 'intentions',
    FOCUS_MODES: 'focusModes',
    BLOCK_RULES: 'blockRules',
    ACTIVE_FOCUS_MODE: 'activeFocusMode',
    PARTNER: 'partner',
    PARTNER_PROGRESS: 'partnerProgress',
    SETTINGS: 'settings',
  };

  // Favorites (limited to 5)
  static async getFavorites(): Promise<string[]> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  static async setFavorites(favorites: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  // App Usage
  static async getAppUsage(): Promise<AppUsage> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.APP_USAGE);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading app usage:', error);
      return {};
    }
  }

  static async setAppUsage(usage: AppUsage): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.APP_USAGE, JSON.stringify(usage));
    } catch (error) {
      console.error('Error saving app usage:', error);
    }
  }

  // Daily Intentions
  static async getIntentions(): Promise<DailyIntention[]> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.INTENTIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading intentions:', error);
      return [];
    }
  }

  static async setIntentions(intentions: DailyIntention[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.KEYS.INTENTIONS,
        JSON.stringify(intentions),
      );
    } catch (error) {
      console.error('Error saving intentions:', error);
    }
  }

  // Focus Modes
  static async getFocusModes(): Promise<FocusModeConfig[]> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.FOCUS_MODES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading focus modes:', error);
      return [];
    }
  }

  static async setFocusModes(modes: FocusModeConfig[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.FOCUS_MODES, JSON.stringify(modes));
    } catch (error) {
      console.error('Error saving focus modes:', error);
    }
  }

  // Block Rules
  static async getBlockRules(): Promise<BlockRule[]> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.BLOCK_RULES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading block rules:', error);
      return [];
    }
  }

  static async setBlockRules(rules: BlockRule[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.BLOCK_RULES, JSON.stringify(rules));
    } catch (error) {
      console.error('Error saving block rules:', error);
    }
  }

  // Active Focus Mode
  static async getActiveFocusMode(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.KEYS.ACTIVE_FOCUS_MODE);
    } catch (error) {
      console.error('Error loading active focus mode:', error);
      return null;
    }
  }

  static async setActiveFocusMode(modeId: string | null): Promise<void> {
    try {
      if (modeId) {
        await AsyncStorage.setItem(this.KEYS.ACTIVE_FOCUS_MODE, modeId);
      } else {
        await AsyncStorage.removeItem(this.KEYS.ACTIVE_FOCUS_MODE);
      }
    } catch (error) {
      console.error('Error saving active focus mode:', error);
    }
  }

  // Partner
  static async getPartner(): Promise<PartnerConfig | null> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.PARTNER);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading partner:', error);
      return null;
    }
  }

  static async setPartner(partner: PartnerConfig | null): Promise<void> {
    try {
      if (partner) {
        await AsyncStorage.setItem(this.KEYS.PARTNER, JSON.stringify(partner));
      } else {
        await AsyncStorage.removeItem(this.KEYS.PARTNER);
      }
    } catch (error) {
      console.error('Error saving partner:', error);
    }
  }

  // Partner Progress
  static async getPartnerProgress(): Promise<PartnerProgress | null> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.PARTNER_PROGRESS);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading partner progress:', error);
      return null;
    }
  }

  static async setPartnerProgress(
    progress: PartnerProgress | null,
  ): Promise<void> {
    try {
      if (progress) {
        await AsyncStorage.setItem(
          this.KEYS.PARTNER_PROGRESS,
          JSON.stringify(progress),
        );
      } else {
        await AsyncStorage.removeItem(this.KEYS.PARTNER_PROGRESS);
      }
    } catch (error) {
      console.error('Error saving partner progress:', error);
    }
  }

  // Settings
  static async getSettings(): Promise<AppSettings> {
    try {
      const stored = await AsyncStorage.getItem(this.KEYS.SETTINGS);
      return stored
        ? JSON.parse(stored)
        : {
            grayscaleEnabled: false,
            notificationsEnabled: true,
            eveningCheckInTime: '20:00',
            morningPromptTime: '08:00',
            breakGlassPhrase: 'I need this',
            vibrationEnabled: true,
          };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        grayscaleEnabled: false,
        notificationsEnabled: true,
        eveningCheckInTime: '20:00',
        morningPromptTime: '08:00',
        breakGlassPhrase: 'I need this',
        vibrationEnabled: true,
      };
    }
  }

  static async setSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  // Clear all data (for testing/reset)
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
