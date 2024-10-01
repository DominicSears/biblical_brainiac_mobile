import { View, Text, TextInput, useColorScheme, ListRenderItem } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import TextField from '@/components/inputs/TextField'
import useDebounce from '@/hooks/useDebounce'
import { get } from '@/lib/helpers'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

const SearchScreen = () => {
	const [query, setQuery] = useState<string>('')
	const [users, setUsers] = useState<any[] | null>(null)

	const insets = useSafeAreaInsets()
	const colorScheme = useColorScheme() ?? 'light'

	useDebounce(query, 500, (debounce: string) => {
		searchUsers(encodeURI(debounce))
	})

	const searchUsers = async (search: string) => {
		const { data, status } = await get(`/users/search?q=${search}`)

		if (status === 200) {
			setUsers(data.users)
		} else {
			setUsers(null)
		}
	}

	return (
		<View style={{ marginTop: insets.top, marginHorizontal: 16 }}>
			<Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 15, color: Colors[colorScheme].text }}>Search</Text>

			<TextField
				placeholder="Search for users..."
				setText={(text: string) => setQuery(text)}
			/>

			{users !== null && (
				<ScrollView>
					{Object.values(users).map((user: any) => (
						<Text style={{ marginTop: 10, fontWeight: 'semibold', fontSize: 20, color: Colors[colorScheme].text }}>{user.username}</Text>
					))}
				</ScrollView>
			)}
		</View>
	)
}

export default SearchScreen
