import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useBlocking} from '../context/BlockingContext';
import {useAppState} from '../context/AppStateContext';
import {FocusModeConfig} from '../types/app.types';

export function FocusModeScreen() {
  const {
    activeFocusMode,
    focusModes,
    activateFocusMode,
    deactivateFocusMode,
    isAccessibilityEnabled,
    requestAccessibilityPermission,
  } = useBlocking();

  const {installedApps} = useAppState();
  const [loading, setLoading] = useState(false);

  const handleActivateFocusMode = async (mode: FocusModeConfig) => {
    if (!isAccessibilityEnabled) {
      Alert.alert(
        'Accessibility Permission Required',
        'To block apps, MinimalistLauncher needs accessibility permission. This allows the app to detect when you try to open blocked apps and show a blocking screen.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Grant Permission',
            onPress: () => requestAccessibilityPermission(),
          },
        ],
      );
      return;
    }

    setLoading(true);
    try {
      const allPackages = installedApps.map(app => app.packageName);
      await activateFocusMode(mode, allPackages);
    } catch (error) {
      Alert.alert('Error', 'Failed to activate focus mode');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateFocusMode = async () => {
    setLoading(true);
    try {
      await deactivateFocusMode();
    } catch (error) {
      Alert.alert('Error', 'Failed to deactivate focus mode');
    } finally {
      setLoading(false);
    }
  };

  const renderFocusModeCard = (mode: FocusModeConfig) => {
    const isActive = activeFocusMode?.id === mode.id;

    return (
      <TouchableOpacity
        key={mode.id}
        style={[styles.modeCard, isActive && styles.modeCardActive]}
        onPress={() =>
          isActive
            ? handleDeactivateFocusMode()
            : handleActivateFocusMode(mode)
        }
        disabled={loading}>
        <View style={styles.modeHeader}>
          <Text style={styles.modeIcon}>{mode.icon}</Text>
          <View style={styles.modeInfo}>
            <Text style={styles.modeName}>{mode.name}</Text>
            <Text style={styles.modeAppsCount}>
              {mode.allowedApps.length} apps allowed
            </Text>
          </View>
          {isActive && (
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          )}
        </View>

        {mode.enableGrayscale && (
          <View style={styles.grayscaleIndicator}>
            <Text style={styles.grayscaleText}>
              ⚫ Enables grayscale mode
            </Text>
          </View>
        )}

        {isActive && (
          <TouchableOpacity
            style={styles.deactivateButton}
            onPress={handleDeactivateFocusMode}>
            <Text style={styles.deactivateButtonText}>Deactivate</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Focus Modes</Text>
        <Text style={styles.headerSubtitle}>
          Block all apps except essentials
        </Text>
      </View>

      {/* Accessibility Permission Warning */}
      {!isAccessibilityEnabled && (
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Permission Required</Text>
          <Text style={styles.warningText}>
            Accessibility permission is needed to block apps. Tap any mode below
            to grant permission.
          </Text>
        </View>
      )}

      {/* Active Mode Banner */}
      {activeFocusMode && (
        <View style={styles.activeBanner}>
          <View style={styles.activeBannerContent}>
            <Text style={styles.activeBannerEmoji}>
              {activeFocusMode.icon}
            </Text>
            <View style={styles.activeBannerInfo}>
              <Text style={styles.activeBannerTitle}>
                {activeFocusMode.name} is active
              </Text>
              <Text style={styles.activeBannerSubtitle}>
                Most apps are blocked
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.deactivateQuickButton}
            onPress={handleDeactivateFocusMode}
            disabled={loading}>
            <Text style={styles.deactivateQuickButtonText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={styles.loadingText}>
            {activeFocusMode ? 'Deactivating...' : 'Activating...'}
          </Text>
        </View>
      )}

      {/* Focus Modes List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRESET MODES</Text>
        {focusModes
          .filter(mode => !mode.isCustom)
          .map(mode => renderFocusModeCard(mode))}
      </View>

      {/* Custom Modes Section (placeholder) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CUSTOM MODES</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Custom modes coming in a future update
          </Text>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>How it works</Text>
        <Text style={styles.instructionsText}>
          • When a Focus Mode is active, all apps except those in the allowed
          list will be blocked
        </Text>
        <Text style={styles.instructionsText}>
          • If you try to open a blocked app, you'll see a blocking screen
        </Text>
        <Text style={styles.instructionsText}>
          • You can "break glass" by typing a phrase to temporarily unlock an
          app
        </Text>
        <Text style={styles.instructionsText}>
          • Some modes enable grayscale to reduce phone appeal
        </Text>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  warningCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFC107',
    borderRadius: 8,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  activeBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  activeBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeBannerEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  activeBannerInfo: {
    flex: 1,
  },
  activeBannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activeBannerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  deactivateQuickButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deactivateQuickButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#111111',
    borderRadius: 8,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#666666',
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 12,
  },
  modeCard: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modeCardActive: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modeIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  modeInfo: {
    flex: 1,
  },
  modeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modeAppsCount: {
    fontSize: 12,
    color: '#999999',
  },
  activeBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  grayscaleIndicator: {
    marginTop: 8,
  },
  grayscaleText: {
    fontSize: 12,
    color: '#999999',
  },
  deactivateButton: {
    marginTop: 12,
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deactivateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  instructionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#111111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 8,
  },
});
