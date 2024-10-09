import React from 'react';

import useAuth from "../hooks/useAuth.ts";

import {authInstance} from '../api/axiosInstances.ts';

const AxiosInterceptor = () => {
	const {logoutUser} = useAuth();
	React.useEffect(() => {
		const interceptor = authInstance.interceptors.response.use(
			response => response,
			async ({response}) => {
				if (response && response.status === 401 && response.data.actions === 'logout') {
					try {
						await logoutUser();
					} catch (error) {
						console.error('Error logging out:', error);
					}
				}
				return Promise.reject(response);
			}
		);
		return () => authInstance.interceptors.response.eject(interceptor);
	}, [logoutUser]);
	return null;
};

export default AxiosInterceptor;
