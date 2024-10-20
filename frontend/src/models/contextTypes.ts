export type UserToken = {
	accessToken: string | null;
	refreshToken: string | null;
}

export type AuthContextType = {
	userToken: UserToken | null;
	setUserToken: (tokens: UserToken | null) => void;
	registerUser: (inputs: object) => Promise<void>;
	loginUser: (inputs: object) => Promise<void>;
	logoutUser: () => Promise<void>;
}