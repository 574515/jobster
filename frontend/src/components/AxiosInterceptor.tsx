import {useEffect} from "react";

import useAuth from '../hooks/useAuth.ts';

import {authInstance, connectionInstance, jobInstance, toApplyInstance} from '../api/axiosInstances.ts';
import {AxiosError} from "axios";
import {ErrorResponse} from "../models/types.ts";

const setupAxiosInterceptors = (
	logoutUser: () => Promise<void>
) => {
	const responseInterceptor = async (error: AxiosError<ErrorResponse>) => {
		const {response} = error;
		if (response && response.status === 401 && response.data && response.data.action === 'logout') {
			await logoutUser()
				.then(() => {
					console.log('User successfully logged out')
				})
				.catch((error: ErrorResponse) => {
					console.error('Error logging out:', error);
				});
		}
		return Promise.reject(error);
	};

	authInstance.interceptors.response.use(
		response => response,
		responseInterceptor
	);

	jobInstance.interceptors.response.use(
		response => response,
		responseInterceptor
	);

	connectionInstance.interceptors.response.use(
		response => response,
		responseInterceptor
	);

	toApplyInstance.interceptors.response.use(
		response => response,
		responseInterceptor
	);
};

const AxiosInterceptor = () => {
	const {logoutUser} = useAuth();
	useEffect(() => setupAxiosInterceptors(logoutUser), [logoutUser]);
	return null;
};

export default AxiosInterceptor;
