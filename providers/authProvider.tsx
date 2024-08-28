import { api } from "@/lib/axios"
import { getToken } from "@/lib/helpers"
import { router } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"

export interface AuthProviderType {
	user: any,
	setUser: React.Dispatch<any>,
	loading: boolean
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
			const res = await api().get("/api/user")

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

	useEffect(() => {
		getToken().then((token: string | null) => {
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
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export default useAuth
