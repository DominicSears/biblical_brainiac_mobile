import useAuth from '@/providers/authProvider';
import axios, { Axios } from 'axios'
import { router } from 'expo-router'
import * as SecureStorage from 'expo-secure-store';

export const api = (): Axios => {
    const { updateAuth } = useAuth()

    const api = axios.create({
        withCredentials: true,
        baseURL: process.env.EXPO_PUBLIC_API_URL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })

    api.interceptors.request.use(
      async (config: any) => {
        const token = await SecureStorage.getItemAsync('token');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      ((error: any) => {
        Promise.reject(error)
      })
    )

    api.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
          if (axios.isAxiosError(error)) {
            if ((error.response?.status ?? 500) === 401) {
              // Remove auth and redirect them
              SecureStorage.deleteItemAsync('token')
                .finally(() => {
                  updateAuth(null)
                  router.replace('/auth')

                  return Promise.reject(error)
                })
            }
          }
    
          return Promise.reject(error)
        }
      )

    return api
}
