import {GroupBase} from 'chakra-react-select';
import React from 'react';

export type DefaultStringKeyNumberModel = {
	[key: string]: number;
}

export type DefaultStringKeyStringModel = {
	[key: string]: string;
}

type ThemePropsBodyType = {
	color: string;
	bg: string;
}

export type ThemeType = {
	body: ThemePropsBodyType;
}

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

export type CustomUser = {
	_id: string;
	email: string;
	username: string;
}

export type LoginValuesType = {
	username: string;
	password: string;
}

export type SignupValuesType = {
	username: string;
	password: string;
	repeatPassword: string;
}

export type CustomIconProps = {
	color: string;
	className: string;
}
// ------------------------------------------------------
export type StatusSelectType = ModalSelectType & {
	count: number;
}

type MyResponseType = {
	user: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

type MyCommonCreationType = {
	company: string;
	jobLink: string;
}

export type MyJobCreationTransformedType = MyCommonCreationType & {
	jobTitle: string;
	description: string;
	category: CategorySelectionModel[];
	status: ModalSelectType;
	userId: string;
	dateApplied: string;
	closingDate: Date;
	note?: string;
}

export type MyJobCreationResponseType =
	MyJobCreationTransformedType & MyResponseType & {
	note: string | null;
}

export type PoolCreationResponseModel = {
	createdAt: string;
	jobLink: string;
	company: string;
	dateApplied: Date;
	updatedAt: string;
}


export type FiltersType = {
	filterName: string;
	filterComponent: React.ReactNode;
}

export type SortByOptionType = {
	whatDate: string;
	when: string;
}

export type DateSelectType = {
	label: string;
	name: string;
	definedDate: Date | undefined;
	isRequired?: boolean;
	hasCheckbox?: boolean;
	isCheckboxChecked?: boolean;
	hasClosingDate?: boolean;

	setDate(date: Date): void;

	setHasClosingDate?(hasClosingDate: boolean): void;
}

export type HomeScreenPagesType = {
	title: string;
	value: string;
}

export type NoteFormValues = {
	note?: string | undefined;
}

export type CustomColorModeIconType = {
	fontSize: string;
	onClick: () => void;
	className: string;
	me: string;
}

export type ModalSelectType = {
	value: string;
	label: string;
	color?: string;
}

export type CategorySelectionModel = {
	value?: string;
	label?: string;
	color?: string;
}

export type CategorySelectionGroupModel = GroupBase<CategorySelectionModel> & {
	label: string;
	options: CategorySelectionModel[];
	color: string;
}

type UserIDModel = {
	userId: string;
}

type StatusModel = {
	value: string;
	label: string;
	color: string;
}

type MyGenericResponseModel = {
	user: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export type MyJobRequestModel = {
	company: string;
	jobTitle: string;
	status: StatusModel;
	dateApplied: Date;
	description?: string;
	category?: CategorySelectionModel[];
	jobLink?: string;
	closingDate?: Date;
	note?: string;
}

export type MyJobTransformedRequestModel = MyJobRequestModel & UserIDModel;

export type MyJobResponseModel = MyJobRequestModel & MyGenericResponseModel & DefaultStringKeyStringModel;

export type MyConnectionRequestModel = {
	company: string;
	jobLink?: string;
	dateSent?: Date;
}
export type MyConnectionTransformedRequestModel = MyConnectionRequestModel & UserIDModel;

export type MyConnectionResponseModel = MyConnectionRequestModel & MyGenericResponseModel & {
	note: string;
}

export type MyFutureApplicationRequestModel = {
	jobLink: string;
	company?: string;
	jobTitle?: string;
	closingDateMFA?: Date;
}

export type MyFutureApplicationTransformedRequestModel = MyFutureApplicationRequestModel & UserIDModel;

export type MyFutureApplicationResponseModel = MyFutureApplicationRequestModel & MyGenericResponseModel & {
	note: string;
}

export type DeleteItemType = {
	deletedProperty: string;
}

export type DeleteItemItemType = {
	_id: string;
}

export type LabelValueType = {
	height: string;
	label?: string;
	value?: string;

	onClick?(): void;
}

export type WindowSizeType = {
	height: number;
	width: number;
}