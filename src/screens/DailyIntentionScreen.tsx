import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useIntention} from '../context/IntentionContext';

export function DailyIntentionScreen() {
  const {
    currentIntention,
    intentionHistory,
    streak,
    loading,
    setTodayIntention,
    completeIntention,
  } = useIntention();

  const [intentionText, setIntentionText] = useState('');
  const [showPrompt, setShowPrompt] = useState(!currentIntention);

  const handleSetIntention = async () => {
    if (intentionText.trim()) {
      await setTodayIntention(intentionText.trim());
      setIntentionText('');
      setShowPrompt(false);
    }
  };

  const handleCompleteIntention = async (
    status: 'complete' | 'partial' | 'missed',
  ) => {
    await completeIntention(status);
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'complete':
        return '✓';
      case 'partial':
        return '◐';
      case 'missed':
        return '✗';
      default:
        return '◯';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return '#4CAF50';
      case 'partial':
        return '#FFC107';
      case 'missed':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  // Morning Prompt Screen
  if (showPrompt || !currentIntention) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <View style={styles.promptContainer}>
          <Text style={styles.promptTitle}>Good morning!</Text>
          <Text style={styles.promptQuestion}>
            What's ONE thing that if you achieved today, you'd feel great?
          </Text>

          <TextInput
            style={styles.input}
            placeholder="E.g., Finish project proposal"
            placeholderTextColor="#666"
            value={intentionText}
            onChangeText={setIntentionText}
            multiline
            autoFocus
          />

          <TouchableOpacity
            style={[
              styles.button,
              !intentionText.trim() && styles.buttonDisabled,
            ]}
            onPress={handleSetIntention}
            disabled={!intentionText.trim()}>
            <Text style={styles.buttonText}>Set Intention</Text>
          </TouchableOpacity>

          {currentIntention && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowPrompt(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // Main Screen with Current Intention
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Intention</Text>
        <View style={styles.streakContainer}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>{streak} day streak</Text>
        </View>
      </View>

      {/* Today's Intention */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TODAY</Text>
        <View style={styles.intentionCard}>
          <Text style={styles.intentionText}>{currentIntention.text}</Text>
          <Text
            style={[
              styles.statusText,
              {color: getStatusColor(currentIntention.status)},
            ]}>
            {currentIntention.status === 'in_progress'
              ? 'In Progress'
              : currentIntention.status === 'complete'
              ? 'Complete'
              : currentIntention.status === 'partial'
              ? 'Partially Done'
              : 'Missed'}
          </Text>

          {currentIntention.status === 'in_progress' && (
            <View style={styles.checkInContainer}>
              <Text style={styles.checkInLabel}>How did it go?</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.statusButton, styles.completeButton]}
                  onPress={() => handleCompleteIntention('complete')}>
                  <Text style={styles.statusButtonText}>✓ Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusButton, styles.partialButton]}
                  onPress={() => handleCompleteIntention('partial')}>
                  <Text style={styles.statusButtonText}>◐ Partial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusButton, styles.missedButton]}
                  onPress={() => handleCompleteIntention('missed')}>
                  <Text style={styles.statusButtonText}>✗ Missed</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowPrompt(true)}>
          <Text style={styles.changeButtonText}>Change Intention</Text>
        </TouchableOpacity>
      </View>

      {/* History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>HISTORY</Text>
        {intentionHistory.length === 0 ? (
          <Text style={styles.emptyHistoryText}>
            No past intentions yet. Start building your streak!
          </Text>
        ) : (
          intentionHistory
            .slice()
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .filter(i => i.date !== currentIntention?.date)
            .map(intention => (
              <View key={intention.id} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyDate}>{intention.date}</Text>
                  <Text
                    style={[
                      styles.historyStatus,
                      {color: getStatusColor(intention.status)},
                    ]}>
                    {getStatusEmoji(intention.status)}
                  </Text>
                </View>
                <Text style={styles.historyText}>{intention.text}</Text>
              </View>
            ))
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  promptTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  promptQuestion: {
    fontSize: 18,
    color: '#CCCCCC',
    lineHeight: 28,
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333333',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#333333',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  streakText: {
    fontSize: 16,
    color: '#FFFFFF',
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
    marginBottom: 12,
  },
  intentionCard: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  intentionText: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  checkInContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  checkInLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  partialButton: {
    backgroundColor: '#FFC107',
  },
  missedButton: {
    backgroundColor: '#F44336',
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  changeButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  emptyHistoryText: {
    color: '#666666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  historyItem: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222222',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    color: '#666666',
  },
  historyStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  historyText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
});
