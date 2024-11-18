type UseFormMyJobCategory = {
	value?: string;
	label?: string;
}

type UseFormMyJobStatus = {
	value: string;
	label: string;
	color: string;
}

export type UseFormMyJobType = {
	company: string;
	jobTitle: string;
	status: UseFormMyJobStatus;
	dateApplied: Date;
	description?: string;
	category?: UseFormMyJobCategory[];
	jobLink?: string;
	closingDate?: Date;
	note?: string;
}

export type UseFormMyConnectionType = {
	company: string;
	jobLink?: string;
	dateSent?: Date;
}

export type UseFormMyFutureApplicationType = {
	jobLink: string;
	company?: string;
	jobTitle?: string;
	closingDateMFA?: Date;
}