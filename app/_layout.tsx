import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuth, { AuthProvider } from '@/providers/authProvider';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [user, setUser] = useState<any>({});

  const checkAuth = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('token');
  }

  useEffect(() => {
    if (loaded) {
      checkAuth().then((auth) => {
        if (auth) {
          router.push('/(tabs)');
        } else {
          router.push('/auth');
        }
      })
        .catch((reason: any) => {
          router.push('/auth');
        })
        .finally(() => {
          SplashScreen.hideAsync();
        })
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootSiblingParent>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>

            <Toast />
          </GestureHandlerRootView>
        </ThemeProvider>
      </RootSiblingParent>
    </AuthProvider>
  );
}
