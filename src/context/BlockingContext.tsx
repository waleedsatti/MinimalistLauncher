import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {FocusModeConfig} from '../types/app.types';
import {StorageService} from '../services/StorageService';
import {AppBlockingModule} from '../native/AppBlockingModule';
import {GrayscaleModule} from '../native/GrayscaleModule';
import {PRESET_FOCUS_MODES} from '../constants/focusModes';

interface BlockingContextType {
  activeFocusMode: FocusModeConfig | null;
  focusModes: FocusModeConfig[];
  grayscaleEnabled: boolean;
  activateFocusMode: (mode: FocusModeConfig, installedApps: string[]) => Promise<void>;
  deactivateFocusMode: () => Promise<void>;
  toggleGrayscale: () => Promise<void>;
  isAccessibilityEnabled: boolean;
  checkAccessibilityPermission: () => Promise<void>;
  requestAccessibilityPermission: () => Promise<void>;
}

const BlockingContext = createContext<BlockingContextType | undefined>(
  undefined,
);

export function BlockingProvider({children}: {children: ReactNode}) {
  const [activeFocusMode, setActiveFocusMode] =
    useState<FocusModeConfig | null>(null);
  const [focusModes, setFocusModes] = useState<FocusModeConfig[]>([]);
  const [grayscaleEnabled, setGrayscaleEnabled] = useState(false);
  const [isAccessibilityEnabled, setIsAccessibilityEnabled] = useState(false);

  useEffect(() => {
    loadData();
    checkAccessibilityPermission();
  }, []);

  const loadData = async () => {
    try {
      // Load focus modes (or use presets)
      const storedModes = await StorageService.getFocusModes();
      if (storedModes.length > 0) {
        setFocusModes(storedModes);
      } else {
        // Initialize with presets
        await StorageService.setFocusModes(PRESET_FOCUS_MODES);
        setFocusModes(PRESET_FOCUS_MODES);
      }

      // Load active focus mode
      const activeModeId = await StorageService.getActiveFocusMode();
      if (activeModeId) {
        const modes = storedModes.length > 0 ? storedModes : PRESET_FOCUS_MODES;
        const activeMode = modes.find(m => m.id === activeModeId);
        if (activeMode) {
          setActiveFocusMode(activeMode);
        }
      }

      // Load grayscale state
      const isGrayscale = await GrayscaleModule.isGrayscaleEnabled();
      setGrayscaleEnabled(isGrayscale);
    } catch (error) {
      console.error('Error loading blocking data:', error);
    }
  };

  const checkAccessibilityPermission = async () => {
    try {
      const isEnabled = await AppBlockingModule.isAccessibilityServiceEnabled();
      setIsAccessibilityEnabled(isEnabled);
    } catch (error) {
      console.error('Error checking accessibility permission:', error);
    }
  };

  const requestAccessibilityPermission = async () => {
    try {
      await AppBlockingModule.requestAccessibilityPermission();
      // User will need to manually enable it in settings
    } catch (error) {
      console.error('Error requesting accessibility permission:', error);
    }
  };

  const activateFocusMode = async (
    mode: FocusModeConfig,
    installedApps: string[],
  ) => {
    try {
      // Calculate which apps to block (all apps except allowed ones)
      const blockedApps = installedApps.filter(
        pkg => !mode.allowedApps.includes(pkg),
      );

      // Set blocked apps via native module
      await AppBlockingModule.setBlockedApps(blockedApps, `Focus Mode: ${mode.name}`);

      // Enable grayscale if specified
      if (mode.enableGrayscale) {
        await GrayscaleModule.enableGrayscale();
        setGrayscaleEnabled(true);
      }

      // Update state
      const updatedMode = {...mode, isActive: true};
      setActiveFocusMode(updatedMode);

      // Save to storage
      await StorageService.setActiveFocusMode(mode.id);

      // Update focus modes list
      const updatedModes = focusModes.map(m =>
        m.id === mode.id ? updatedMode : {...m, isActive: false},
      );
      setFocusModes(updatedModes);
      await StorageService.setFocusModes(updatedModes);
    } catch (error) {
      console.error('Error activating focus mode:', error);
      throw error;
    }
  };

  const deactivateFocusMode = async () => {
    try {
      // Clear blocked apps
      await AppBlockingModule.clearBlockedApps();

      // Disable grayscale if it was enabled by focus mode
      if (activeFocusMode?.enableGrayscale) {
        await GrayscaleModule.disableGrayscale();
        setGrayscaleEnabled(false);
      }

      // Update state
      setActiveFocusMode(null);
      await StorageService.setActiveFocusMode(null);

      // Update focus modes list
      const updatedModes = focusModes.map(m => ({...m, isActive: false}));
      setFocusModes(updatedModes);
      await StorageService.setFocusModes(updatedModes);
    } catch (error) {
      console.error('Error deactivating focus mode:', error);
      throw error;
    }
  };

  const toggleGrayscale = async () => {
    try {
      const newState = await GrayscaleModule.toggleGrayscale();
      setGrayscaleEnabled(newState);
    } catch (error) {
      console.error('Error toggling grayscale:', error);
      throw error;
    }
  };

  return (
    <BlockingContext.Provider
      value={{
        activeFocusMode,
        focusModes,
        grayscaleEnabled,
        activateFocusMode,
        deactivateFocusMode,
        toggleGrayscale,
        isAccessibilityEnabled,
        checkAccessibilityPermission,
        requestAccessibilityPermission,
      }}>
      {children}
    </BlockingContext.Provider>
  );
}

export function useBlocking() {
  const context = useContext(BlockingContext);
  if (context === undefined) {
    throw new Error('useBlocking must be used within BlockingProvider');
  }
  return context;
}
