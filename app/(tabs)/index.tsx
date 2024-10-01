import { Colors } from "@/constants/Colors";
import { get } from "@/lib/helpers";
import { TouchableOpacity, View, Text, useColorScheme, ActivityIndicator } from "react-native";
import * as SecureStorage from 'expo-secure-store';
import useAuth from "@/providers/authProvider";
import { router } from "expo-router";

export default function HomeScreen() {
  const { setUser, user } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';

  const handleLogout = async () => {
    const { data, status } = await get('/signout');

    await SecureStorage.deleteItemAsync('token');
    setUser(null);
    router.replace('/auth');
  }

  return (
    <>
      {!user ? (
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black', fontSize: 30, fontWeight: 'bold' }}>{`Hello ${user.username}!`}</Text>

          <View style={{ width: '50%' }}>
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: Colors.primary,
                marginTop: 32,
                width: '100%',
                paddingVertical: 15,
                borderRadius: 15
              }}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center'
              }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
      }
    </>
  );
}
