import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface App {
  packageName: string;
  appName: string;
}

interface AppListItemProps {
  app: App;
  usageCount: number;
  isFavorite?: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export function AppListItem({
  app,
  usageCount,
  isFavorite = false,
  onPress,
  onLongPress,
}: AppListItemProps) {
  return (
    <TouchableOpacity
      style={styles.appItem}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={styles.appItemContent}>
        <Text style={styles.appName}>{app.appName}</Text>
        {isFavorite && <Text style={styles.favoriteIndicator}>★</Text>}
      </View>
      <Text style={styles.usageCount}>{usageCount} opens</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
  },
  appItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  favoriteIndicator: {
    fontSize: 16,
    color: '#FFD700',
    marginLeft: 8,
  },
  usageCount: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
});
