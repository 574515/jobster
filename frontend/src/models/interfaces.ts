import React from "react";
import {Control, FieldValues, UseFormReturn} from "react-hook-form";
import {
	AddEditJobType,
	AddEditPoolType,
	AllJobListingsResponseModel,
	AllPoolListingsResponseModel,
	BasicModalSelectTypeLV,
	FiltersType
} from "./componentsTypes.ts";
import {CustomUser} from "./contextTypes.ts";

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface CustomFormProviderProps<T extends FieldValues> {
	children: React.ReactNode;
	formProviderData: UseFormReturn<T>;
}

interface CustomCardProps {
	setIsLoading(isLoading: boolean): void;

	getAllListings(): void;
}

export interface CustomJobCardProps extends CustomCardProps {
	userJob: AllJobListingsResponseModel;
}

export interface CustomPoolCardProps extends CustomCardProps {
	userJob: AllPoolListingsResponseModel;
}

export interface AddEditJobModalProps {
	isOpen: boolean;
	user: CustomUser;
	jobMethods: UseFormReturn<AddEditJobType>;
	poolMethods: UseFormReturn<AddEditPoolType>;

	getAllJobListings(): void;

	getAllPoolListings(): void;

	onClose(): void;
}

export interface LoadingOverlayProps {
	isLoading: boolean;
}

type CustomSelectionProps = {
	name: string;
	py?: number;
	className: string;
	label?: string;
	minDate?: Date;
	isRequired?: boolean;
}

export interface CustomDateSelectProps extends CustomSelectionProps {
	jobControl?: Control<AddEditJobType>;
	poolControl?: Control<AddEditPoolType>;
	definedDate: Date;
	percentWidth?: number;

	setDate(date: Date): void;
}

export interface CustomSelectProps extends CustomSelectionProps {
	control: Control<AddEditJobType>;
	choices: BasicModalSelectTypeLV[];
	definedValue?: BasicModalSelectTypeLV;
	isClearable?: boolean;
	disabled?: boolean;
}

export interface MyJobsProps {
	isLoading: boolean;
	isPool?: boolean;
	userJobListings: AllJobListingsResponseModel[];
	userPoolListings: AllPoolListingsResponseModel[];

	setIsLoading(isLoading: boolean): void;

	getAllJobListings(): void;

	getAllPoolListings(): void;
}

export interface StatusListProps {
	jobListings: AllJobListingsResponseModel[];
	checkedStates: Record<string, boolean>;

	setCheckedStates: (updater: (prevState: Record<string, boolean>) => Record<string, boolean>) => void;
}

export interface FilterProps {
	checkedStates: Record<string, boolean>;
	userJobListings: AllJobListingsResponseModel[];

	setCheckedStates: (updater: (prevState: Record<string, boolean>) => Record<string, boolean>) => void;

	setSearchedListings(searchListings: AllJobListingsResponseModel[]): void;

	setFilterActive(filterActive: number): void;
}

export interface StatusFiltersProps {
	listOfFilters: FiltersType[];
}

export interface TextSearchProps {
	userJobListings: AllJobListingsResponseModel[];

	setSearchedListings(searchListings: AllJobListingsResponseModel[]): void;
}

export interface SortByProps {
	isPool?: boolean;
	userJobListings?: AllJobListingsResponseModel[];
	userPoolListings?: AllPoolListingsResponseModel[];

	setUserJobListings?(searchListings: AllJobListingsResponseModel[]): void;

	setUserPoolListings?(searchListings: AllPoolListingsResponseModel[]): void;
}