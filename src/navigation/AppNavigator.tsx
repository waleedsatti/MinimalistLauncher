import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {HomeScreen} from '../screens/HomeScreen';
import {AllAppsScreen} from '../screens/AllAppsScreen';
import {FocusModeScreen} from '../screens/FocusModeScreen';
import {UsageStatsScreen} from '../screens/UsageStatsScreen';
import {DailyIntentionScreen} from '../screens/DailyIntentionScreen';
import {AccountabilityPartnerScreen} from '../screens/AccountabilityPartnerScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// Home stack with HomeScreen and AllAppsScreen
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="AllApps"
        component={AllAppsScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </HomeStack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopColor: '#333333',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#666666',
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="IntentionTab"
          component={DailyIntentionScreen}
          options={{
            tabBarLabel: 'Intention',
          }}
        />
        <Tab.Screen
          name="FocusTab"
          component={FocusModeScreen}
          options={{
            tabBarLabel: 'Focus',
          }}
        />
        <Tab.Screen
          name="StatsTab"
          component={UsageStatsScreen}
          options={{
            tabBarLabel: 'Stats',
          }}
        />
        <Tab.Screen
          name="PartnerTab"
          component={AccountabilityPartnerScreen}
          options={{
            tabBarLabel: 'Partner',
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
