import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {useBlocking} from '../context/BlockingContext';

export function SettingsScreen() {
  const {grayscaleEnabled, toggleGrayscale} = useBlocking();
  const [isToggling, setIsToggling] = useState(false);

  const handleGrayscaleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleGrayscale();
    } catch (error) {
      Alert.alert(
        'Permission Required',
        'To enable grayscale mode, you need to grant WRITE_SECURE_SETTINGS permission via ADB.\n\nRun this command:\nadb shell pm grant com.minimalistlauncher android.permission.WRITE_SECURE_SETTINGS',
      );
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Display Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DISPLAY</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Grayscale Mode</Text>
            <Text style={styles.settingDescription}>
              Remove colors to reduce phone appeal
            </Text>
          </View>
          <Switch
            value={grayscaleEnabled}
            onValueChange={handleGrayscaleToggle}
            disabled={isToggling}
            trackColor={{false: '#333333', true: '#4CAF50'}}
            thumbColor={grayscaleEnabled ? '#FFFFFF' : '#999999'}
          />
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Features</Text>
          <Text style={styles.infoValue}>
            • 5-app home screen limit{'\n'}
            • Daily Intention tracking{'\n'}
            • Focus Modes (Emergency, Work, Reading, Sleep){'\n'}
            • App Blocking with Break Glass{'\n'}
            • Usage Statistics{'\n'}
            • Grayscale Mode
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Privacy</Text>
          <Text style={styles.infoValue}>
            All data is stored locally on your device. No data is sent to external servers.
          </Text>
        </View>
      </View>

      {/* Permissions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PERMISSIONS NEEDED</Text>

        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>📊 Usage Stats</Text>
          <Text style={styles.permissionText}>
            To display screen time and app usage statistics
          </Text>
        </View>

        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>♿ Accessibility Service</Text>
          <Text style={styles.permissionText}>
            To detect and block apps during Focus Mode
          </Text>
        </View>

        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>⚙️ Write Secure Settings</Text>
          <Text style={styles.permissionText}>
            To enable/disable grayscale mode (requires ADB command)
          </Text>
        </View>
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  permissionCard: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 12,
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 20,
  },
});
