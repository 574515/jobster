import {BasicModalSelectTypeLV, ModalSelectType, SortByOptionType} from "../models/componentsTypes.ts";

export const Constants = {
	MIN_LENGTH_COMPANY_NAME: 2,
	MAX_LENGTH_COMPANY_NAME: 64,

	MIN_LENGTH_JOB_NAME: 2,
	MAX_LENGTH_JOB_NAME: 256,

	DAY_IN_MILLISECONDS: 86400000,

	MIN_LENGTH_USERNAME: 3,
	MAX_LENGTH_USERNAME: 16,

	PASSWORD_MIN_LENGTH: 8,
};

const defaultLoginValues = {
	username: "",
	password: ""
};

const defaultRegisterValues = {
	username: "",
	password: "",
	repeatPassword: "",
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

export const defaultNewPoolValues = {
	company: "",
	jobLink: "",
	dateSent: new Date(),
}

export const defaultNewJobValues = {
	company: "",
	jobTitle: "",
	description: "",
	category: {
		value: "",
		label: "",
	},
	jobLink: "",
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

export const sortByJobOptions: SortByOptionType[] = [
	{
		whatDate: "Date Applied",
		when: "Newest",
	},
	{
		whatDate: "Date Applied",
		when: "Oldest",
	},
	{
		whatDate: "Closing Date",
		when: "Later",
	},
	{
		whatDate: "Closing Date",
		when: "Sooner",
	},
];

export const sortByPoolOptions: SortByOptionType[] = [
	{
		whatDate: "Date Sent",
		when: "Newest",
	},
	{
		whatDate: "Date Sent",
		when: "Oldest",
	},
]

export const homeScreenPages = {
	MY_JOBS: "myJobs",
	POOL: "pool",
};