import { api } from "@/lib/axios"
import { router } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"

export interface AuthProviderType {
	user: any,
	setUser: React.Dispatch<any>,
	loading: boolean,
	updateAuth: (user: any) => void
}

export const useAuth = (): AuthProviderType => {
	const ctx = useContext(AuthContext);

	if (ctx === null) {
		throw Error('No auth context');
	}

	return ctx;
}

const AuthContext = createContext<AuthProviderType | null>(null);

export const AuthProvider = ({ children, initialUser }: any) => {
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	const getUserData = async () => {
		let status, data

		try {
			const res = await api().get("/user")

			data = res.data
			status = res.status
		} catch (e: any) {
			data = e?.response?.data ?? {}
			status = e?.response?.status ?? 500
		}

		if (status === 200) {
			setUser(data)
		}
	}

	const updateAuth = (authUser: any) => {
		setUser(authUser)
	}

	useEffect(() => {
		SecureStore.getItemAsync('token')
			.then((token: string | null) => {

				if (token && !user) {
					console.info("needs user")

					getUserData().then(() => {
						setLoading(false)
					})
				} else {
					router.replace("/")
				}
			})
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser, loading, updateAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default useAuth
