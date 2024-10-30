import React from "react";

type ThemePropsBody = {
	color: string;
	bg: string;
}

export type ThemeProps = {
	body: ThemePropsBody;
}

export type LoginValues = {
	username: string;
	password: string;
}

export type SignupValues = {
	username: string;
	password: string;
	repeatPassword: string;
};

export type CustomColorModeIcon = {
	fontSize: string;
	onClick: () => void;
	className: string;
	me: string;
};

type BasicModalSelectTypeLC = {
	label: string;
	color: string;
}

export type BasicModalSelectTypeLV = {
	label?: string;
	value?: string;
}

export type ModalSelectType = BasicModalSelectTypeLC & {
	label: string;
	color: string;
	value: string;
}

export type StatusSelectType = ModalSelectType & {
	count: number;
}

export type AddEditPoolType = {
	company: string
	jobLink?: string;
	dateSent?: Date;
};

export type TransformedAddEditPoolType = AddEditPoolType & {
	userId: string;
}

export type AddEditJobType = {
	company: string;
	jobTitle: string;
	description?: string;
	category: BasicModalSelectTypeLV;
	jobLink?: string;
	status: ModalSelectType;
	dateApplied: Date;
	closingDate?: Date;
};

export type TransformedAddEditJobProps = AddEditJobType & {
	userId: string;
}

export type JobCreationResponseModel = {
	category?: string;
	createdAt: string;
	description: string;
	jobLink: string;
	name: string;
	status: ModalSelectType;
	updatedAt: string;
};

export type JobDeletionResponseModel = {
	jobTitle: string;
	_id: string;
}

export type PoolDeletionResponseModel = {
	company: string;
	_id: string;
}

export type PoolCreationResponseModel = {
	createdAt: string;
	jobLink: string;
	company: string;
	dateApplied: Date;
	updatedAt: string;
};

export type AllJobListingsResponseModel = AddEditJobType & {
	[key: string]: string;
	_id: string;
};


export type AllPoolListingsResponseModel = AddEditPoolType & {
	[key: string]: string;
	_id: string;
}

export type AddEditJobNameType =
	"jobLink" |
	"description" |
	"company" |
	"jobTitle" |
	"category" |
	"status" |
	"dateApplied" |
	"closingDate" |
	"category.value" |
	"category.label" |
	"status.value" |
	"status.label" |
	"status.color";

export type AddEditPoolNameType =
	"jobLink" |
	"company" |
	"dateSent";

export type FiltersType = {
	filterName: string;
	filterComponent: React.ReactNode;
	className: string;
}

export type SortByOptionType = {
	whatDate: string;
	when: string;
}

export type CheckSXType = {
	'.chakra-switch__track[data-checked]:not([data-theme])': {
		backgroundColor: string;
	},
	'span.chakra-switch__track:not([data-checked])': {
		backgroundColor: string;
	},
}

export type DateSelectType = {
	label: string;
	name: string;
	definedDate: Date;
	setDate(date: Date): void;
}

export type CustomDateSelectPropsType = {
	triggerBtnProps: {
		width: string;
	}
}

export type HomeScreenPagesType = {
	title: string;
	value: string;
}