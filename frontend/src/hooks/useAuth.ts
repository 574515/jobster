import React from 'react';
import {AuthContextType} from "../models/contextTypes.ts";
import AuthContext from '../context/AuthContext.tsx'

const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;