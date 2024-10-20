import React from 'react';
import userAtom from '../atoms/userAtom.ts';
import authScreenAtom from "../atoms/authScreenAtom.ts";

import {useNavigate} from 'react-router-dom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {toast} from "../helpers/customToast.ts";
import {AuthContextType, UserToken} from "../models/contextTypes.ts";
import {authInstance} from "../api/axiosInstances.ts";
import {AuthProviderProps} from "../models/interfaces.ts";

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const storedTokensString = localStorage.getItem('userToken');
	const storedTokens: UserToken | null = storedTokensString ? JSON.parse(storedTokensString) : null;
	const [userToken, setUserToken] = React.useState<UserToken | null>(storedTokens);
	const setUser = useSetRecoilState(userAtom);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const user = useRecoilValue(userAtom);
	const navigate = useNavigate();

	const loginUser = async (inputs: object) => {
		await authInstance
			.post('/login', inputs)
			.then((res) => {
				setUserToken(res.data);
				localStorage.setItem('userToken', JSON.stringify(res.data));
				setUser(res.data);
				navigate('/');
				toast('Login Successful', 'success', 2000);
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
				// TODO: Fix on backend so it's consistent
				const errorMessage = err.response ?
					err.response.data.error : err.data.error;
				toast(errorMessage, 'error');
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
				navigate('/auth');
				toast('You have been logged out', 'success');
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
