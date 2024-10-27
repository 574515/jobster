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
	email: string;
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
	label: string;
	value: string;
}

export type ModalSelectType = BasicModalSelectTypeLC & {
	label: string;
	color: string;
	value: string;
}

export type StatusSelectType = ModalSelectType & {
	count: number;
}

export type AddEditJobProps = {
	company: string;
	jobTitle: string;
	description?: string;
	category: BasicModalSelectTypeLV;
	jobLink?: string;
	status: ModalSelectType;
	dateApplied: Date;
	closingDate: Date;
};

export type TransformedAddEditJobProps = AddEditJobProps & {
	userId: string;
}

export type JobCreationResponseModel = {
	category: string;
	createdAt: string;
	description: string;
	jobLink: string;
	name: string;
	status: ModalSelectType;
	updatedAt: string;
};

export type AllJobsResponseModel = AddEditJobProps & {
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

export type FiltersType = {
	filterName: string;
	filterComponent: React.ReactNode;
	className: string;
}