import { View, Text, useColorScheme, TextInput, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

interface TextFieldProps {
	label?: string,
	type?: KeyboardTypeOptions | undefined,
	placeholder?: string,
	secureTextEntry?: boolean;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
	setText: (text: string) => void
}

const TextField = ({
	type,
	setText,
	label,
	placeholder,
	secureTextEntry = false,
	autoCapitalize = 'none'
}: TextFieldProps) => {
	const colorScheme = useColorScheme() ?? 'light';

	return (
		<View style={{
			width: '100%',
		}}>
			{label !== undefined && (
				<Text style={{ color: Colors[colorScheme].text, fontSize: 20, marginBottom: 15 }}>{label}</Text>
			)}

			<TextInput
				style={{
					width: '100%',
					paddingHorizontal: 15,
					paddingVertical: 25,
					borderRadius: 15,
					backgroundColor: Colors[colorScheme].input,
					textDecorationColor: 'black',
					color: Colors[colorScheme].text
				}}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				placeholderTextColor={Colors[colorScheme].placeholder}
				keyboardType={type}
				onChangeText={(text: string) => {
					setText(text);
				}}
			/>
		</View>
	)
}

export default TextField
