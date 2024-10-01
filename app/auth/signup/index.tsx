import { View, Text, useColorScheme, Switch, SwitchChangeEvent, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CaretLeft from '@/components/icons/CaretLeft';
import { Colors } from '@/constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import TextField from '@/components/inputs/TextField';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import useAuth from '@/providers/authProvider';
import * as SecureStorage from 'expo-secure-store';

const SignUp = () => {
	const insets = useSafeAreaInsets();
	const colorScheme = useColorScheme() ?? 'light';

	const [loading, setLoading] = useState<boolean>(false);
	const [state, setState] = useState<{ [key: string]: any }>({
		is_female: false
	});
	const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

	const { setUser } = useAuth();

	const updateState = (key: string, value: any) => {
		setState({
			...state,
			[key]: value
		})
	}

	const handleSubmit = async () => {
		let data, status;

		try {
			const res = await axios.post('/signup', JSON.stringify(state), {
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
			if (!e?.response) {
				console.error('signUpError:', e);
			}

			data = e?.response?.data ?? {};
			status = e?.response?.status ?? 500;
		}

		console.log({
			data, status
		})

		if (status === 201) {
			await SecureStorage.setItemAsync('token', data.token);
			setUser(data.user);

			router.push('/(tabs)');
		} else if (status === 422) {
			setErrors(data.errors);
			Toast.show({
				type: 'error',
				text1: 'Form errors!',
				text2: data.message,
				position: 'top',
				topOffset: insets.top
			})
		} else {
			Toast.show({
				type: 'error',
				text1: 'Form errors!',
				text2: data.message,
				position: 'top',
				topOffset: insets.top
			})
		}
	}

	return (
		<>
			{loading ? (
				<View style={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<ActivityIndicator />
				</View>
			) : (
				<View style={{
					flex: 1,
					marginTop: insets.top,
					marginHorizontal: 30
				}}>
					<View style={{
						display: 'flex', flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 20
					}}>
						<TouchableOpacity
							onPress={() => {
								router.back();
							}}
						>
							<CaretLeft style={{
								width: 24, height: 24,
								color: Colors[colorScheme].text
							}} />
						</TouchableOpacity>

						<Text style={{
							color: Colors[colorScheme].text,
							fontWeight: 'bold',
							fontSize: 36,
							paddingLeft: 20
						}}>Sign Up</Text>
					</View>

					{/* Form */}
					<ScrollView>
						{/* First Name */}
						<View style={{ paddingBottom: 37 }}>
							<TextField
								label="Name"
								setText={text => updateState('name', text)}
							/>
						</View>

						{/* Email */}
						<View style={{ paddingBottom: 37 }}>
							<TextField
								label="Email"
								setText={text => updateState('email', text)}
							/>
						</View>

						{/* Confirm Email */}
						<View style={{ paddingBottom: 37 }}>
							<TextField
								label="Confirm Email"
								setText={text => updateState('confirm_email', text)}
							/>
						</View>

						{/* Username */}
						<View style={{ paddingBottom: 37 }}>
							<TextField
								label="Username"
								setText={text => updateState('username', text)}
							/>
						</View>

						{/* Password */}
						<View style={{ paddingBottom: 37 }}>
							{/* TODO: Toggle secureTextEntry */}
							<TextField
								secureTextEntry
								label="Password"
								setText={text => updateState('password', text)}
							/>
						</View>

						{/* Confirm Password */}
						<View style={{ paddingBottom: 37 }}>
							{/* TODO: Toggle secureTextEntry */}
							<TextField
								secureTextEntry
								label="Confirm Password"
								setText={text => updateState('confirm_password', text)}
							/>
						</View>

						{/* Gender */}
						<View style={{ paddingBottom: 37 }}>
							<Text style={{ color: Colors[colorScheme].text, fontSize: 20, marginBottom: 15 }}>Gender</Text>

							<View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ color: Colors[colorScheme].text, fontSize: 20, marginRight: 10 }}>M</Text>

								<View>
									<Switch
										value={state.is_female}
										onValueChange={() => {
											setState((prevState) => {
												return {
													...prevState,
													is_female: !prevState.is_female
												}
											})
										}}
									/>
								</View>

								<Text style={{ color: Colors[colorScheme].text, fontSize: 20, marginLeft: 10 }}>F</Text>
							</View>
						</View>

						<View style={{ width: '100%', marginBottom: insets.bottom }}>
							<TouchableOpacity
								onPress={handleSubmit}
								style={{
									backgroundColor: Colors.primary,
									width: '100%',
									paddingVertical: 15,
									borderRadius: 15
								}}
								disabled={false}
							>
								<Text style={{
									color: 'white',
									fontWeight: 'bold',
									fontSize: 20,
									textAlign: 'center'
								}}>Sign Up</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			)}
		</>
	)
}

export default SignUp
