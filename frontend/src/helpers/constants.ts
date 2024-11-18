import {
	DefaultStringKeyNumberModel,
	DefaultStringKeyStringModel,
	HomeScreenPagesType,
	ModalSelectType,
	SortByOptionType
} from '../models/types.ts';

export const Constants = {
	MIN_LENGTH_COMPANY_NAME: 2,
	MAX_LENGTH_COMPANY_NAME: 64,
	MIN_LENGTH_JOB_NAME: 2,
	MAX_LENGTH_JOB_NAME: 256,
	MAX_LENGTH_NOTE: 1024,
	MAX_CATEGORIES: 5,
	DAY_IN_MILLISECONDS: 86400000,
	MIN_LENGTH_USERNAME: 3,
	MAX_LENGTH_USERNAME: 16,
	PASSWORD_MIN_LENGTH: 8,
};

export const homeScreenPages = {
	MY_JOBS: 'myJobs',
	MY_CONNECTIONS: 'myConnections',
	MY_FUTURE_APPLICATIONS: 'myFutureApplications'
};

const defaultLoginValues = {
	username: '',
	password: ''
};

const defaultRegisterValues = {
	username: '',
	password: '',
	repeatPassword: '',
};

export const getDefaultValues = (mode: string) => {
	switch (mode) {
		case 'login':
			return defaultLoginValues;
		case 'register':
			return defaultRegisterValues;
		default:
			return {}
	}
};

export const forbiddenUsernames = [
	'admin',
	'root',
];

export const defaultMyConnectionValues = {
	company: '',
	jobLink: '',
	dateSent: new Date(),
};

export const defaultMyFutureApplicationValues = {
	company: '',
	jobTitle: '',
	jobLink: '',
	closingDateMFA: new Date(),
};

export const defaultMyJobValues = {
	company: '',
	jobTitle: '',
	description: '',
	category: [],
	jobLink: '',
	status: {
		value: '',
		label: '',
		color: ''
	},
	closingDate: new Date(),
	dateApplied: new Date(),
	note: '',
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
		value: 'cancelled',
		label: 'Cancelled',
		color: '#D646C0',
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

const sortByMyJobOptions: SortByOptionType[] = [
	{
		whatDate: 'Date Applied',
		when: 'Newest',
	},
	{
		whatDate: 'Date Applied',
		when: 'Oldest',
	},
	{
		whatDate: 'Closing Date',
		when: 'Later',
	},
	{
		whatDate: 'Closing Date',
		when: 'Sooner',
	},
];

const sortByMyConnections: SortByOptionType[] = [
	{
		whatDate: 'Date Sent',
		when: 'Newest',
	},
	{
		whatDate: 'Date Sent',
		when: 'Oldest',
	},
];

const sortByMyFutureApplications: SortByOptionType[] = [
	{
		whatDate: 'Closing Date',
		when: 'Later',
	},
	{
		whatDate: 'Closing Date',
		when: 'Sooner',
	},
];

export const sortByOptions = {
	[homeScreenPages.MY_JOBS]: sortByMyJobOptions,
	[homeScreenPages.MY_CONNECTIONS]: sortByMyConnections,
	[homeScreenPages.MY_FUTURE_APPLICATIONS]: sortByMyFutureApplications,
};

export const constantItemName: DefaultStringKeyStringModel = {
	myJobs: 'My Job',
	myConnections: 'My Connection',
	myFutureApplications: 'My Future Application',
};

export const homeScreenPagesList: HomeScreenPagesType[] = [
	{
		title: 'My Jobs',
		value: homeScreenPages.MY_JOBS,
	},
	{
		title: 'My Connections',
		value: homeScreenPages.MY_CONNECTIONS,
	},
	{
		title: 'My Future Applications',
		value: homeScreenPages.MY_FUTURE_APPLICATIONS,
	}
];

export const addModalTabs: DefaultStringKeyNumberModel = {
	[homeScreenPages.MY_JOBS]: 0,
	[homeScreenPages.MY_CONNECTIONS]: 1,
	[homeScreenPages.MY_FUTURE_APPLICATIONS]: 2,
};