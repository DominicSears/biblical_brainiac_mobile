import { View, Text, useColorScheme, Image } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors';
import TextField from '@/components/inputs/TextField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';
import { get, post } from '@/lib/helpers';
import * as SecureStore from 'expo-secure-store';
import useAuth from '@/providers/authProvider';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Login = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setUser } = useAuth();

  const handleLogin = async () => {
    let data, status;

    try {
      const res = await axios.post('/login', JSON.stringify({
        email: username, password
      }), {
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        withCredentials: false,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      data = res.data;
      status = res.status;
    } catch (e: any) {
      console.error('loginError', e);

      data = e?.response?.data ?? {};
      status = e?.response?.status ?? 500;
    }

    if (status === 200) {
      setUser(data.user);
      await SecureStore.setItemAsync('token', data.token);

      router.replace('/(tabs)');
    } else if (status === 401) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Invalid credentials',
        topOffset: insets.top,
        position: 'top',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Error logging in',
        topOffset: insets.top,
        position: 'top',
      })
    }
  }


  return (
    <View style={{
      marginTop: insets.top,
      marginBottom: insets.bottom,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Image
        source={require('@/assets/images/logo.png')}
        resizeMethod='resize'
        resizeMode='contain'
        style={{
          marginTop: -20,
          maxWidth: '100%',
          width: '100%',
          height: 300,
        }}
      />

      <View style={{
        paddingHorizontal: 31,
        width: '100%',
        display: 'flex',
        flex: 1,
        alignItems: 'center'
      }}>
        <Text style={{
          color: Colors[colorScheme].text,
          fontSize: 36,
          fontWeight: 'bold',
          marginTop: -20,
          marginBottom: 32
        }}>Sign In</Text>

        <View style={{
          width: '100%',
          flex: 1
        }}>
          {/* Form */}
          <View style={{ width: '100%' }}>
            <TextField
              type="email-address"
              autoCapitalize='none'
              label="Username/Email"
              placeholder="Enter username or email..."
              setText={setUsername}
            />

            <View style={{ width: '100%', marginTop: 20 }}>
              <TextField
                secureTextEntry
                label="Password"
                placeholder="Enter password..."
                setText={setPassword}
              />
            </View>
          </View>

          <View style={{ width: '100%' }}>
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor:
                  username === '' || password === ''
                    ? Colors.primary_gray
                    : Colors.primary,
                marginTop: 32,
                width: '100%',
                paddingVertical: 15,
                borderRadius: 15
              }}
              disabled={username === '' || password === ''}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center'
              }}>Login</Text>
            </TouchableOpacity>

            <Text style={{ textAlign: 'right', marginTop: 10, color: Colors[colorScheme].text }}>
              Don't have an account? <Link
                style={{ textDecorationLine: 'underline' }} href="/auth/signup">Sign up!</Link>
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Login
