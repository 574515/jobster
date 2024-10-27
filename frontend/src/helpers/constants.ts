export const TEXT_MIN_LENGTH = 3;
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

export const forbiddenUsernames = [
	"admin",
	"root",
];

export const defaultNewJobValues = {
	company: "",
	jobTitle: "",
	description: "",
	category: {
		value: "",
		label: "",
	},
	link: "",
	status: {
		value: "",
		label: "",
		color: ""
	},
	closingDate: new Date(),
	dateApplied: new Date(),
};
