import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import {AppListItem} from '../components/AppListItem';
import {useAppState} from '../context/AppStateContext';
import {App} from '../types/app.types';

export function AllAppsScreen() {
  const {
    installedApps,
    favorites,
    toggleFavorite,
    launchApp,
    getUsageCount,
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter apps based on search query
  const filteredApps = installedApps.filter(app =>
    app.appName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderAppItem = ({item}: {item: App}) => (
    <AppListItem
      app={item}
      usageCount={getUsageCount(item.packageName)}
      isFavorite={favorites.includes(item.packageName)}
      onPress={() => launchApp(item.packageName)}
      onLongPress={() => toggleFavorite(item.packageName)}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Apps</Text>
        <Text style={styles.headerSubtitle}>
          {filteredApps.length} apps
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search apps..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* App List */}
      <FlatList
        data={filteredApps}
        renderItem={renderAppItem}
        keyExtractor={item => item.packageName}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No apps found</Text>
          </View>
        }
      />

      {/* Instructions */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap to open • Long press to add/remove favorites (max 5)
        </Text>
      </View>
    </View>
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
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#444444',
  },
});
