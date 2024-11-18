import React from 'react';

import userAtom from '../atoms/userAtom.ts';
import authScreenAtom from "../atoms/authScreenAtom.ts";

import {useNavigate} from 'react-router-dom';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {toast} from "../helpers/customToast.ts";
import {AuthContextType, CustomUser, UserToken} from "../models/types.ts";
import {authInstance} from "../api/axiosInstances.ts";
import {AuthProviderProps} from "../models/interfaces.ts";

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const storedTokensString = localStorage.getItem('userToken');
	const storedTokens: UserToken | null = storedTokensString ? JSON.parse(storedTokensString) : null;
	const [userToken, setUserToken] = React.useState<UserToken | null>(storedTokens);
	const setAuthScreen = useSetRecoilState<string>(authScreenAtom);
	const [user, setUser] = useRecoilState<CustomUser | null>(userAtom);
	const navigate = useNavigate();

	const loginUser = async (inputs: object) => {
		await authInstance
			.post('/login', inputs)
			.then((res) => {
				setUserToken(res.data);
				localStorage.setItem('userToken', JSON.stringify(res.data));
				setUser(res.data);
				toast('Login Successful', 'success', 2000);
				navigate('/');
			})
			.catch((err) => {
				toast('Username or password does not exists', 'error');
				return Promise.reject(err);
			});
	};

	const registerUser = async (inputs: object) => {
		await authInstance
			.post('/signup', inputs)
			.then(() => {
				setAuthScreen('login')
				toast('Registration Successful', 'success', 2000);
			})
			.catch((err) => {
				toast(err.data.error, 'error');
				return Promise.reject(err);
			});
	};

	const logoutUser = async () => {
		await authInstance
			.post('/logout')
			.then(() => {
				setUserToken(null);
				setUser(null);
				localStorage.removeItem('userToken');
				toast('You have been logged out', 'success');
				navigate('/auth');
			})
			.catch((err) => {
				toast(err.response?.data?.error, 'error');
				return Promise.reject(err);
			});
	};

	const value = {
		user,
		userToken,
		setUserToken,
		registerUser,
		loginUser,
		logoutUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
