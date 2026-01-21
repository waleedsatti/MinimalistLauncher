import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
  Clipboard,
} from 'react-native';
import {StorageService} from '../services/StorageService';
import {PartnerConfig, PartnerProgress} from '../types/app.types';
import {useIntention} from '../context/IntentionContext';

export function AccountabilityPartnerScreen() {
  const {currentIntention, streak} = useIntention();
  const [partner, setPartner] = useState<PartnerConfig | null>(null);
  const [partnerProgress, setPartnerProgress] = useState<PartnerProgress | null>(null);
  const [connectionCode, setConnectionCode] = useState('');
  const [showConnectForm, setShowConnectForm] = useState(false);

  useEffect(() => {
    loadPartnerData();
  }, []);

  const loadPartnerData = async () => {
    const storedPartner = await StorageService.getPartner();
    const storedProgress = await StorageService.getPartnerProgress();
    setPartner(storedPartner);
    setPartnerProgress(storedProgress);
  };

  const generateConnectionCode = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerateCode = () => {
    const code = generateConnectionCode();
    const message = `Join me on MinimalistLauncher! Let's hold each other accountable for phone usage.\n\nMy code: ${code}\n\nDownload: https://github.com/waleedsatti/MinimalistLauncher`;

    Share.share({message});
  };

  const handleConnectPartner = async () => {
    if (!connectionCode.trim()) {
      Alert.alert('Error', 'Please enter a connection code');
      return;
    }

    const newPartner: PartnerConfig = {
      partnerId: `partner-${Date.now()}`,
      partnerName: connectionCode.trim(),
      connectionCode: connectionCode.trim(),
      connectedAt: new Date().toISOString(),
      sharingEnabled: true,
      lastSyncedAt: new Date().toISOString(),
    };

    await StorageService.setPartner(newPartner);
    setPartner(newPartner);
    setConnectionCode('');
    setShowConnectForm(false);
    Alert.alert('Success', 'Partner connected! You can now share progress.');
  };

  const handleDisconnectPartner = async () => {
    Alert.alert(
      'Disconnect Partner',
      'Are you sure you want to disconnect from your accountability partner?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            await StorageService.setPartner(null);
            await StorageService.setPartnerProgress(null);
            setPartner(null);
            setPartnerProgress(null);
          },
        },
      ],
    );
  };

  const calculatePhoneFreeMinutes = (): number => {
    // Simplified calculation - in real app, would use UsageStatsModule
    // For now, return a mock value
    return 180; // 3 hours
  };

  const handleShareProgress = async () => {
    const progress: PartnerProgress = {
      date: new Date().toISOString().split('T')[0],
      phoneFreeMinutes: calculatePhoneFreeMinutes(),
      socialMediaFreeMinutes: 240, // Mock value
      currentIntention: currentIntention?.text || 'No intention set',
      intentionStatus: currentIntention?.status || 'in_progress',
      streakDays: streak,
    };

    const jsonData = JSON.stringify(progress, null, 2);

    try {
      await Share.share({
        message: `My progress today:\n\n${jsonData}`,
        title: 'MinimalistLauncher Progress',
      });
    } catch (error) {
      console.error('Error sharing progress:', error);
    }
  };

  const handleImportProgress = () => {
    Alert.prompt(
      'Import Partner Progress',
      'Paste the JSON progress data from your partner:',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Import',
          onPress: async (text) => {
            try {
              const progress = JSON.parse(text || '{}');
              await StorageService.setPartnerProgress(progress);
              setPartnerProgress(progress);
              Alert.alert('Success', 'Partner progress imported!');
            } catch (error) {
              Alert.alert('Error', 'Invalid JSON data');
            }
          },
        },
      ],
      'plain-text',
    );
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accountability Partner</Text>
        <Text style={styles.headerSubtitle}>
          Stay accountable together
        </Text>
      </View>

      {/* No Partner State */}
      {!partner && !showConnectForm && (
        <View style={styles.section}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No partner yet</Text>
            <Text style={styles.emptyText}>
              Connect with a friend to share your progress and stay accountable.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGenerateCode}>
            <Text style={styles.primaryButtonText}>
              Generate Code & Invite Friend
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowConnectForm(true)}>
            <Text style={styles.secondaryButtonText}>
              I Have a Code
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Connect Form */}
      {showConnectForm && !partner && (
        <View style={styles.section}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Enter Connection Code</Text>
            <Text style={styles.formSubtitle}>
              Enter the 6-character code your partner shared with you
            </Text>
            <TextInput
              style={styles.input}
              placeholder="ABC123"
              placeholderTextColor="#666"
              value={connectionCode}
              onChangeText={setConnectionCode}
              autoCapitalize="characters"
              maxLength={6}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowConnectForm(false);
                  setConnectionCode('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.connectButton]}
                onPress={handleConnectPartner}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Partner Connected */}
      {partner && (
        <>
          {/* Partner Info */}
          <View style={styles.section}>
            <View style={styles.partnerCard}>
              <View style={styles.partnerHeader}>
                <View style={styles.partnerAvatar}>
                  <Text style={styles.partnerAvatarText}>
                    {partner.partnerName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>{partner.partnerName}</Text>
                  <Text style={styles.partnerStatus}>
                    Connected since{' '}
                    {new Date(partner.connectedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.disconnectButton}
                onPress={handleDisconnectPartner}>
                <Text style={styles.disconnectButtonText}>Disconnect</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* My Progress */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MY PROGRESS TODAY</Text>
            <View style={styles.progressCard}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>📱 Phone-Free</Text>
                <Text style={styles.progressValue}>
                  {formatTime(calculatePhoneFreeMinutes())}
                </Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>🚫 No Social Media</Text>
                <Text style={styles.progressValue}>4h 0m</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>🎯 Daily Intention</Text>
                <Text style={styles.progressValue}>
                  {currentIntention?.status === 'complete'
                    ? '✓ Done'
                    : currentIntention?.status === 'partial'
                    ? '◐ Partial'
                    : '◯ In Progress'}
                </Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>🔥 Streak</Text>
                <Text style={styles.progressValue}>{streak} days</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShareProgress}>
              <Text style={styles.shareButtonText}>Share My Progress</Text>
            </TouchableOpacity>
          </View>

          {/* Partner's Progress */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PARTNER'S PROGRESS</Text>
            {partnerProgress ? (
              <View style={styles.progressCard}>
                <Text style={styles.progressDate}>
                  Last updated: {partnerProgress.date}
                </Text>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>📱 Phone-Free</Text>
                  <Text style={styles.progressValue}>
                    {formatTime(partnerProgress.phoneFreeMinutes)}
                  </Text>
                </View>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>🚫 No Social Media</Text>
                  <Text style={styles.progressValue}>
                    {formatTime(partnerProgress.socialMediaFreeMinutes)}
                  </Text>
                </View>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>🎯 Intention</Text>
                  <Text style={styles.progressValueSmall}>
                    {partnerProgress.currentIntention}
                  </Text>
                </View>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>🔥 Streak</Text>
                  <Text style={styles.progressValue}>
                    {partnerProgress.streakDays} days
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  No progress data yet. Ask your partner to share their progress!
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.importButton}
              onPress={handleImportProgress}>
              <Text style={styles.importButtonText}>Import Partner's Progress</Text>
            </TouchableOpacity>
          </View>

          {/* How It Works */}
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>How it works</Text>
              <Text style={styles.infoText}>
                1. Tap "Share My Progress" to generate a JSON with your stats
              </Text>
              <Text style={styles.infoText}>
                2. Send it to your partner via SMS, WhatsApp, or any messaging app
              </Text>
              <Text style={styles.infoText}>
                3. Your partner taps "Import Partner's Progress" and pastes the JSON
              </Text>
              <Text style={styles.infoText}>
                4. You can see each other's progress and stay accountable!
              </Text>
            </View>
          </View>
        </>
      )}

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
  emptyCard: {
    backgroundColor: '#111111',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: '#111111',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333333',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  partnerCard: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  partnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  partnerAvatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  partnerStatus: {
    fontSize: 12,
    color: '#999999',
  },
  disconnectButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  disconnectButtonText: {
    color: '#F44336',
    fontSize: 12,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 12,
  },
  progressDate: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 12,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressValueSmall: {
    fontSize: 13,
    color: '#FFFFFF',
    maxWidth: 200,
    textAlign: 'right',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  importButton: {
    backgroundColor: '#333333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  importButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 8,
  },
});
