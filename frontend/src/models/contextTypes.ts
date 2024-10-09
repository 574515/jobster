export type AuthTokens = {
    accessToken: string | null;
    refreshToken: string | null;
}

export type AuthContextType = {
    authTokens: AuthTokens | null;
    setAuthTokens: (tokens: AuthTokens | null) => void;
    registerUser: (inputs: object) => Promise<void>;
    loginUser: (inputs: object) => Promise<void>;
    logoutUser: () => Promise<void>;
}