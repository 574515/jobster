export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 16;
export const PASSWORD_MIN_LENGTH = 8;

const defaultLoginValues = {
	username: "",
	password: ""
};

const defaultRegisterValues = {
	...defaultLoginValues,
	repeatPassword: "",
	email: "",
}

export const getDefaultValues = (mode: string) => {
	switch (mode) {
		case "login":
			return defaultLoginValues;
		case "register":
			return defaultRegisterValues;
		default:
			return {}
	}
}