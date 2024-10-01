import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '@/components/icons/HomeIcon';
import QuestionsIcon from '@/components/icons/QuestionsIcon';
import StatsIcon from '@/components/icons/StatsIcon';
import GradesIcon from '@/components/icons/GradesIcon';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.';
import QuestionScreen from './questions';
import AddScreen from './add';
import StatsScreen from './stats';
import GradeScreen from './grades';
import PlusIcon from '@/components/icons/PlusIcon';
import HomeFilledIcon from '@/components/icons/HomeFilledIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import SearchScreen from './search';
import SearchFilledIcon from '@/components/icons/SearchFilledIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colorScheme === 'dark' ? '#0A173A' : 'white',
        marginBottom: insets.bottom,
        paddingBottom: 0,
        paddingTop: 0,
        alignItems: 'center',
        borderRadius: 32,
        marginHorizontal: 13,
        height: 75,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderBlockColor: colorScheme === 'dark' ? '#0E245D' : '#ECECEC',
        borderColor: colorScheme === 'dark' ? '#0E245D' : '#ECECEC',
        borderWidth: 1,
      },
      tabBarShowLabel: false
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <HomeFilledIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} /> : <HomeIcon colorScheme={colorScheme} />
          ),
        }}
      />
      <Tab.Screen
        name="Searcg"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <SearchFilledIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} /> : <SearchIcon colorScheme={colorScheme} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 35,
              borderRadius: 99999,
              width: 64,
              height: 64,
              backgroundColor: Colors.primary
            }}>
              <PlusIcon style={{ color: 'white' }} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <StatsIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} />
          )
        }}
      />
      <Tab.Screen
        name="Grades"
        component={GradeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <GradesIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} />
          ),
        }}
      />
      <Tabs.Screen
        name="questions/index"
        options={{
         
        }}
      />
      <Tabs.Screen
        name="CustomAction"
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Handle your custom action
            // handleCustomAction();
          },
        })}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => { }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: 'white' }}>Text</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Tabs.Screen
        name="stats/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <StatsIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="grades/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <GradesIcon style={{ color: focused ? '#578BBE' : Colors.light.input }} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  )

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? Colors.primary : 'white',
          marginBottom: insets.bottom,
          paddingBottom: 0,
          paddingTop: 0,
          alignItems: 'center',
          borderRadius: 18,
          marginHorizontal: 30,
          height: 75,
          borderTopWidth: 1,
          borderStyle: 'solid',
          borderBlockColor: colorScheme === 'dark' ? '#003265' : '#8B8B8C',
          borderColor: colorScheme === 'dark' ? '#003265' : '#8B8B8C',
          borderWidth: 1,
        },
        tabBarShowLabel: false
      }}>

    </Tabs>
  );
}
