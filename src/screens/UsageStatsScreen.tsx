import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AppUsageStatsModule} from '../native/AppUsageStatsModule';
import {useAppState} from '../context/AppStateContext';

interface AppUsageData {
  packageName: string;
  appName: string;
  totalTimeInForeground: number;
}

export function UsageStatsScreen() {
  const {installedApps} = useAppState();
  const [usageData, setUsageData] = useState<AppUsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [totalScreenTime, setTotalScreenTime] = useState(0);

  useEffect(() => {
    loadUsageStats();
  }, []);

  const loadUsageStats = async () => {
    setLoading(true);
    try {
      // Check permission
      const permission = await AppUsageStatsModule.hasUsageStatsPermission();
      setHasPermission(permission);

      if (permission) {
        // Get today's usage
        const stats = await AppUsageStatsModule.getTodayUsage();

        // Convert to array and sort by usage time
        const usageArray: AppUsageData[] = [];
        let total = 0;

        Object.keys(stats).forEach(packageName => {
          const timeMs = stats[packageName].totalTimeInForeground;
          if (timeMs > 0) {
            // Find app name
            const app = installedApps.find(a => a.packageName === packageName);
            usageArray.push({
              packageName,
              appName: app?.appName || packageName,
              totalTimeInForeground: timeMs,
            });
            total += timeMs;
          }
        });

        // Sort by usage time descending
        usageArray.sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);

        setUsageData(usageArray.slice(0, 20)); // Top 20 apps
        setTotalScreenTime(total);
      }
    } catch (error) {
      console.error('Error loading usage stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const requestPermission = async () => {
    await AppUsageStatsModule.requestUsageStatsPermission();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Permission Required</Text>
          <Text style={styles.permissionText}>
            To display usage statistics, MinimalistLauncher needs access to usage data.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Usage Stats</Text>
        <Text style={styles.headerSubtitle}>Today's screen time</Text>
      </View>

      {/* Total Screen Time */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Screen Time</Text>
        <Text style={styles.totalTime}>{formatTime(totalScreenTime)}</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadUsageStats}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* App Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>APP BREAKDOWN</Text>
        {usageData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No usage data yet. Start using apps to see stats here.
            </Text>
          </View>
        ) : (
          usageData.map((app, index) => {
            const percentage = ((app.totalTimeInForeground / totalScreenTime) * 100).toFixed(0);
            return (
              <View key={app.packageName} style={styles.appUsageItem}>
                <View style={styles.appUsageHeader}>
                  <Text style={styles.appUsageRank}>#{index + 1}</Text>
                  <View style={styles.appUsageInfo}>
                    <Text style={styles.appUsageName} numberOfLines={1}>
                      {app.appName}
                    </Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {width: `${percentage}%`},
                        ]}
                      />
                    </View>
                  </View>
                  <View style={styles.appUsageTime}>
                    <Text style={styles.appUsageTimeText}>
                      {formatTime(app.totalTimeInForeground)}
                    </Text>
                    <Text style={styles.appUsagePercentage}>
                      {percentage}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
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
  totalCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    backgroundColor: '#111111',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  totalLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
    letterSpacing: 1,
  },
  totalTime: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  refreshButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333333',
    borderRadius: 6,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
    marginBottom: 16,
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
  appUsageItem: {
    marginBottom: 16,
  },
  appUsageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appUsageRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    width: 40,
  },
  appUsageInfo: {
    flex: 1,
    marginRight: 16,
  },
  appUsageName: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  appUsageTime: {
    alignItems: 'flex-end',
  },
  appUsageTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appUsagePercentage: {
    fontSize: 12,
    color: '#999999',
  },
});
