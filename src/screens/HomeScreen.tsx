import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Clock} from '../components/Clock';
import {AppListItem} from '../components/AppListItem';
import {IntentionBanner} from '../components/IntentionBanner';
import {useAppState} from '../context/AppStateContext';
import {useIntention} from '../context/IntentionContext';

export function HomeScreen() {
  const navigation = useNavigation();
  const {
    installedApps,
    favorites,
    loading,
    toggleFavorite,
    launchApp,
    getUsageCount,
  } = useAppState();

  const {currentIntention} = useIntention();

  // Get favorite apps (limited to 5)
  const favoriteApps = installedApps.filter(app =>
    favorites.includes(app.packageName),
  );

  const handleIntentionPress = () => {
    navigation.navigate('IntentionTab' as never);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Clock */}
      <Clock />

      {/* Daily Intention Banner */}
      <View style={styles.intentionContainer}>
        <IntentionBanner
          intention={currentIntention?.text || null}
          onPress={handleIntentionPress}
        />
      </View>

      {/* Quick Access (Favorites - Max 5) */}
      {favoriteApps.length > 0 && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
          {favoriteApps.map(app => (
            <TouchableOpacity
              key={app.packageName}
              style={styles.favoriteItem}
              onPress={() => launchApp(app.packageName)}
              onLongPress={() => toggleFavorite(app.packageName)}>
              <Text style={styles.appName}>{app.appName}</Text>
              <Text style={styles.usageCount}>
                {getUsageCount(app.packageName)} opens
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Swipe Up Hint */}
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          Tap app to open • Long press to add/remove from Quick Access
        </Text>
        <Text style={styles.hintText}>Swipe up for all apps →</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  intentionContainer: {
    paddingHorizontal: 0,
  },
  favoritesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
    letterSpacing: 2,
    fontWeight: '600',
  },
  favoriteItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  usageCount: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  hintContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 11,
    color: '#444444',
    marginTop: 4,
  },
});
