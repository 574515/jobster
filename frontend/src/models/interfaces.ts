import React from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {
	CustomUser,
	DateSelectType,
	DeleteItemItemType,
	DeleteItemType,
	FiltersType,
	HomeScreenPagesType,
	ModalSelectType,
	MyConnectionRequestModel,
	MyConnectionResponseModel,
	MyFutureApplicationRequestModel,
	MyFutureApplicationResponseModel,
	MyJobRequestModel,
	MyJobResponseModel,
} from "./types.ts";
import {ConstantItemNames} from "../helpers/enums.ts";
import {UseFormMyConnectionType, UseFormMyFutureApplicationType, UseFormMyJobType} from "./helperTypes.ts";

export interface AuthProviderProps {
	children: React.ReactNode;
}

export interface CustomFormProviderProps<T extends FieldValues> {
	children: React.ReactNode;
	formProviderData: UseFormReturn<T>;
}

export interface CustomJobCardProps {
	item: MyJobResponseModel;

	getAllItems(): void;
}

export interface CustomConnectionCardProps {
	item: MyConnectionResponseModel;

	getAllItems(): void;
}

export interface CustomFutureApplicationCardProps {
	item: MyFutureApplicationResponseModel;

	getAllItems(): void;
}

export interface HeaderProps {
	statisticsDisabled: boolean;

	handlePageClick(pageValue: string): void;

	getClassName(page: HomeScreenPagesType): string;

	getBottomBorder(page: HomeScreenPagesType): string | undefined;

	getColor(page: HomeScreenPagesType): string;

	getHeading(page: HomeScreenPagesType): React.ReactNode;

	onOpen(): void;

	onOpenStats(): void;
}

export interface AddEditJobModalProps {
	isOpen: boolean;
	user: CustomUser;
	myJobMethods: UseFormReturn<UseFormMyJobType>;
	myConnectionMethods: UseFormReturn<UseFormMyConnectionType>;
	myFutureApplicationMethods: UseFormReturn<UseFormMyFutureApplicationType>;

	onClose(): void;

	getAllMyJobs(): void;

	getAllMyConnections(): void;

	getAllMyFutureApplications(): void;
}

export interface LoadingOverlayProps {
	isApp?: boolean;
}

export interface MyJobsProps {
	allMyJobs: MyJobResponseModel[];
	allMyConnections: MyConnectionResponseModel[];
	allMyFutureApplications: MyFutureApplicationResponseModel[];

	getAllMyJobs(): void;

	getAllMyConnections(): void;

	getAllMyFutureApplications(): void;
}

export interface StatusListProps {
	jobListings: MyJobResponseModel[];
	checkedStatuses: Record<string, boolean>;

	setCheckedStatuses(updater: (prevState: Record<string, boolean>) => Record<string, boolean>): void;
}

export interface FilterProps {
	checkedStatuses: Record<string, boolean>;
	allMyJobs: MyJobResponseModel[];

	setCheckedStatuses(updater: (prevState: Record<string, boolean>) => Record<string, boolean>): void;

	setMyJobsFiltered(searchListings: MyJobResponseModel[]): void;

	setFilterActive(filterActive: number): void;
}

export interface StatusFiltersProps {
	listOfFilters: FiltersType[];
}

export interface TextSearchProps {
	allMyJobs: MyJobResponseModel[];

	setMyJobsFiltered(searchListings: MyJobResponseModel[]): void;
}

export interface SortByProps {
	allMyJobs?: MyJobResponseModel[];
	allMyConnections?: MyConnectionResponseModel[];
	allMyFutureApplications?: MyFutureApplicationResponseModel[];

	setAllMyJobs?(searchListings: MyJobResponseModel[]): void;

	setAllMyConnections?(searchListings: MyConnectionResponseModel[]): void;

	setAllMyFutureApplications?(searchListings: MyFutureApplicationResponseModel[]): void;
}

export interface AddNoteProps {
	isAddEditNoteOpen: boolean;
	item: MyJobResponseModel | MyConnectionResponseModel | MyFutureApplicationResponseModel;
	identifier: ConstantItemNames;

	onAddEditNoteClose(): void;

	getAllItems(): void;
}

export interface CustomDeleteAlertProps {
	isDeleteOpen: boolean;
	cancelRef: React.RefObject<HTMLButtonElement>;
	item: MyJobResponseModel | MyConnectionResponseModel | MyFutureApplicationResponseModel;
	type: string;

	handleDelete(): void;

	onDeleteClose(): void;
}

export interface CustomAddNoteIconProps {
	item: MyJobResponseModel | MyConnectionResponseModel | MyFutureApplicationResponseModel;

	onAddEditNoteOpen(): void;
}


export interface DeleteItemHookProps {
	item: DeleteItemItemType;
	deleteAction: (id: string) => Promise<DeleteItemType>;
	getAllItems: () => void;
}

export interface AddMyJobTabPanelProps {
	myJobMethods: UseFormReturn<UseFormMyJobType>;
	myJobDateSelects: DateSelectType[];
	userLocale: string;
	dateApplied: Date;
	statuses: ModalSelectType[];

	handleMyJobSave(data: MyJobRequestModel): void;
}

export interface AddMyConnectionTabPanelProps {
	myConnectionMethods: UseFormReturn<UseFormMyConnectionType>;
	myConnectionDateSelects: DateSelectType[];
	userLocale: string;

	handleMyConnectionSave(data: MyConnectionRequestModel): void;
}

export interface AddMyFutureApplicationTabPanelProps {
	myFutureApplicationMethods: UseFormReturn<UseFormMyFutureApplicationType>;
	myFutureApplicationsDateSelects: DateSelectType[];
	userLocale: string;

	handleToApplySave(data: MyFutureApplicationRequestModel): void;
}

export interface CombinedFiltersProps {
	allMyJobs?: MyJobResponseModel[];
	allMyConnections?: MyConnectionResponseModel[];
	allMyFutureConnections?: MyFutureApplicationResponseModel[];
	totalNumberOfListings: number;
	checkedStatuses: Record<string, boolean>;

	setAllMyJobs?(searchListings: MyJobResponseModel[]): void;

	setAllMyConnections?(searchListings: MyConnectionResponseModel[]): void;

	setUserToApplyListings?(searchListings: MyFutureApplicationResponseModel[]): void;

	setCheckedStatuses(updater: (prevState: Record<string, boolean>) => Record<string, boolean>): void;

	setMyJobsFiltered(searchListings: MyJobResponseModel[]): void;

	setFilterActive(filterActive: number): void;
}

export interface CustomSubmitButtonGroupProps {
	resetMethod(): void;
}

export interface StatisticsProps {
	isOpen: boolean;
	allMyJobs: MyJobResponseModel[];
	allMyConnections: MyConnectionResponseModel[];
	allMyFutureConnections: MyFutureApplicationResponseModel[];

	onClose(): void;
}

export interface MyJobStatisticProps {
	allMyJobs: MyJobResponseModel[];
}

export interface MyCustomStatisticProps {
	myConnectionData?: MyConnectionResponseModel[];
	myFutureApplicationData?: MyFutureApplicationResponseModel[];
}

export interface CustomDateTagProps {
	dateToShow: Date;
	title: string;
}