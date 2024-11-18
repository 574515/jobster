import React from 'react';

import AuthContext from '../context/AuthContext.tsx'

import {AuthContextType} from "../models/types.ts";

const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export default useAuth;