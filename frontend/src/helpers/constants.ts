import {BasicModalSelectTypeLV, ModalSelectType} from "../models/componentsTypes.ts";

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

export const statusesToSet: ModalSelectType[] = [
	{
		value: 'applied',
		label: 'Applied',
		color: '#F7E73F',
	},
	{
		value: 'declined',
		label: 'Declined',
		color: '#FC3232',
	},
	{
		value: 'testing',
		label: 'Testing',
		color: '#269DE9',
	},
	{
		value: 'interview',
		label: 'Interview',
		color: '#9856F2',
	},
	{
		value: 'referral',
		label: 'Referral',
		color: '#F7A71B',
	},
	{
		value: 'offer',
		label: 'Offer',
		color: '#3ECF6F',
	},
];

export const jobListingCategories: BasicModalSelectTypeLV[] = [
	{
		value: 'blue',
		label: 'Blue',
	},
	{
		value: 'purple',
		label: 'Purple',
	},
	{
		value: 'red',
		label: 'Red',
	},
	{
		value: 'orange',
		label: 'Orange',
	},
	{
		value: 'yellow',
		label: 'Yellow',
	},
	{
		value: 'green',
		label: 'Green',
	},
];
