import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface IntentionBannerProps {
  intention: string | null;
  onPress?: () => void;
}

export function IntentionBanner({intention, onPress}: IntentionBannerProps) {
  if (!intention) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.emptyText}>Set your daily intention →</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>TODAY'S INTENTION</Text>
      <Text style={styles.intentionText}>{intention}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#111111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  label: {
    fontSize: 10,
    color: '#666666',
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 8,
  },
  intentionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
});
