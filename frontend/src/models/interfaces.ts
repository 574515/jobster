import React from "react";
import {Control, FieldValues, UseFormReturn} from "react-hook-form";
import {AddEditJobProps, AllJobsResponseModel, BasicModalSelectTypeLV, FiltersType} from "./componentsTypes.ts";
import {CustomUser} from "./contextTypes.ts";

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface CustomFormProviderProps<T extends FieldValues> {
	children: React.ReactNode;
	formProviderData: UseFormReturn<T>;
}

export interface CustomJobCardProps {
	userJob: AllJobsResponseModel;

	setIsLoading(isLoading: boolean): void;

	getAllListings(): void;
}

export interface AddEditJobModalProps {
	isOpen: boolean;
	user: CustomUser;
	methods: UseFormReturn<AddEditJobProps>;

	getAllListings(): void;

	onClose(): void;
}

export interface LoadingOverlayProps {
	isLoading: boolean;
}

type CustomSelectionProps = {
	control: Control<AddEditJobProps>;
	name: string;
	py?: number;
	className: string;
	label?: string;
}

export interface CustomDateSelectProps extends CustomSelectionProps {
	definedDate: Date;

	setDate(date: Date): void;
}

export interface CustomSelectProps extends CustomSelectionProps {
	choices: BasicModalSelectTypeLV[];
	definedValue?: BasicModalSelectTypeLV;
	isClearable?: boolean;
	disabled?: boolean;
}

export interface MyJobsProps {
	isLoading: boolean;
	userJobListings: AllJobsResponseModel[];

	setIsLoading(isLoading: boolean): void;

	getAllListings(): void;
}

export interface StatusListProps {
	jobListings: AllJobsResponseModel[];
	checkedStates: Record<string, boolean>;

	setCheckedStates: (updater: (prevState: Record<string, boolean>) => Record<string, boolean>) => void;
}

export interface FilterProps {
	checkedStates: Record<string, boolean>;
	userJobListings: AllJobsResponseModel[];

	setCheckedStates: (updater: (prevState: Record<string, boolean>) => Record<string, boolean>) => void;
}

export interface StatusFiltersProps {
	listOfFilters: FiltersType[];
}