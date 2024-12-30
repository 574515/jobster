import {FC, useEffect, useMemo, useState} from "react";

import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import loadingAtom from "../atoms/loadingAtom.ts";
import userLocaleAtom from "../atoms/userLocaleAtom.ts";
import isPhoneAtom from "../atoms/isPhoneAtom.ts";
import AddMyConnectionTabPanel from "./addPanels/AddMyConnectionTabPanel.tsx";
import AddMyFutureApplicationTabPanel from "./addPanels/AddMyFutureApplicationTabPanel.tsx";
import AddMyJobTabPanel from "./addPanels/AddMyJobTabPanel.tsx";

import {
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanels,
	Tabs
} from "@chakra-ui/react";
import {
	CategorySelectionModel,
	DateSelectType,
	ModalSelectType,
	MyConnectionRequestModel,
	MyConnectionResponseModel,
	MyConnectionTransformedRequestModel,
	MyFutureApplicationRequestModel,
	MyFutureApplicationResponseModel,
	MyFutureApplicationTransformedRequestModel,
	MyJobRequestModel,
	MyJobResponseModel,
	MyJobTransformedRequestModel,
} from "../models/types.ts";
import {addModalTabs, Constants, homeScreenPages, statusesToSet} from "../helpers/constants.ts";
import {ConnectionActions, JobActions, ToApplyActions} from "./AppActions.action.ts";
import {toast} from "../helpers/customToast.ts";
import {AddEditJobModalProps} from "../models/interfaces.ts";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {useTranslation} from "react-i18next";
import {jobListingCategories} from "../helpers/categories.ts";

const AddListingModal: FC<AddEditJobModalProps> = (
	{
		isOpen, onClose, user, getAllMyJobs, getAllMyConnections,
		getAllMyFutureApplications, myJobMethods, myConnectionMethods, myFutureApplicationMethods
	}
) => {
	const userLocale = useRecoilValue<string>(userLocaleAtom);
	const [homeScreenState, setHomeScreenState] = useRecoilState<string>(homeScreenAtom);
	const [currentTab, setCurrentTab] = useState<number>(0);
	const [statuses, setStatuses] = useState<ModalSelectType[]>([]);
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const [dateApplied, setDateApplied] = useState<Date>(new Date());
	const [closingDate, setClosingDate] = useState<Date>(new Date());
	const [closingDateMFA, setClosingDateMFA] = useState<Date>(new Date(+new Date() + Constants.DAY_IN_MILLISECONDS));
	const [dateSent, setDateSent] = useState<Date>(new Date());
	const [hasClosingDate, setHasClosingDate] = useState<boolean>(false);
	const isPhone = useRecoilValue<boolean>(isPhoneAtom);
	const {t} = useTranslation();

	useEffect(() => setStatuses(statusesToSet), []);

	useEffect(() => setCurrentTab(addModalTabs[homeScreenState]), [homeScreenState]);

	const preprocessedColors = useMemo(() =>
		new Map(jobListingCategories.flatMap(obj => obj.options
			.filter(option => option?.value)
			.map(option => [option.value, obj.color])
		)), []);

	const assignColorsToCategorySelectionOptimized = (
		categories: CategorySelectionModel[]
	): CategorySelectionModel[] => {
		return categories.map((category) => ({
			...category,
			color: category.value ? preprocessedColors.get(category.value) || category.color : category.color,
		}));
	};

	const handleMyJobSave = (data: MyJobRequestModel) => {
		setIsLoading(true);
		const newCategories = data?.category?.map((cat: CategorySelectionModel) => {
			const group = jobListingCategories.find((obj) =>
				obj.options.some((option) => option.value === cat.value)
			);

			return {
				...cat,
				color: cat.color || group?.color || "#FF0000",
				tooltip: group?.label || "Unknown Group",
			};
		}) || [];
		const coloredCategories: CategorySelectionModel[] = assignColorsToCategorySelectionOptimized(newCategories);
		const transformedData: MyJobTransformedRequestModel = {
			company: data.company,
			jobTitle: data.jobTitle,
			jobLink: data.jobLink,
			description: data.description,
			category: coloredCategories,
			status: data.status,
			userId: user._id,
			dateApplied: data.dateApplied,
			closingDate: hasClosingDate ? data.closingDate : undefined,
			note: data.note ?? undefined,
		};
		JobActions
			.postMyNewJob(transformedData)
			.then((response: MyJobResponseModel): void => {
				onClose();
				void toast(`${t("addPanels.Job")} "${response.jobTitle}" ${t("addPanels.AddedSuccessfully")}`, 'success');
				myJobMethods.reset();
				setDateApplied(new Date());
				setClosingDate(new Date());
				getAllMyJobs();
				setHomeScreenState(homeScreenPages.MY_JOBS);
			})
			.catch((err) => void toast(err.response.data.error, 'error'))
			.finally(() => {
				setHasClosingDate(false);
				setIsLoading(false);
			});
	};

	const handleMyConnectionSave = (data: MyConnectionRequestModel) => {
		setIsLoading(true);
		const transformedData: MyConnectionTransformedRequestModel = {
			company: data.company,
			jobLink: data.jobLink,
			dateSent: data.dateSent,
			userId: user._id,
		};
		ConnectionActions
			.postMyConnection(transformedData)
			.then((response: MyConnectionResponseModel) => {
				onClose();
				void toast(`${t("addPanels.ConnectionFor")} "${response.company}" ${t("addPanels.AddedSuccessfully")}`, 'success');
				myConnectionMethods.reset();
				getAllMyConnections();
				setHomeScreenState(homeScreenPages.MY_CONNECTIONS);
			})
			.catch((err) => void toast(err.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	};

	const handleToApplySave = (data: MyFutureApplicationRequestModel) => {
		setIsLoading(true);
		const transformedData: MyFutureApplicationTransformedRequestModel = {
			company: data.company,
			jobLink: data.jobLink,
			jobTitle: data.jobTitle,
			closingDateMFA: data.closingDateMFA,
			userId: user._id,
		};
		ToApplyActions
			.postMyToApply(transformedData)
			.then((response: MyFutureApplicationResponseModel) => {
				onClose();
				void toast(`${t("addPanels.MyFutureApplicationFor")} "${response.company}" ${t("addPanels.AddedSuccessfully")}`, 'success');
				myFutureApplicationMethods.reset();
				getAllMyFutureApplications();
				setHomeScreenState(homeScreenPages.MY_FUTURE_APPLICATIONS);
			})
			.catch((err) => void toast(err.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	}

	const jobDateSelects: DateSelectType[] = [
		{
			label: t("filters.Applied Date"),
			name: "dateApplied",
			definedDate: dateApplied,
			isRequired: true,
			setDate: setDateApplied,
		},
		{
			label: t("filters.Closing Date"),
			name: "closingDate",
			definedDate: closingDate,
			isRequired: false,
			hasCheckbox: true,
			isCheckboxChecked: false,
			hasClosingDate: hasClosingDate,
			setDate: setClosingDate,
			setHasClosingDate: setHasClosingDate,
		},
	];

	const myConnectionDateSelects: DateSelectType[] = [
		{
			label: t("filters.Date Sent"),
			name: "dateSent",
			definedDate: dateSent,
			setDate: setDateSent,
		},
	];

	const myFutureApplicationsDateSelects: DateSelectType[] = [
		{
			label: t("filters.Closing Date"),
			name: "closingDateMFA",
			definedDate: closingDateMFA,
			setDate: setClosingDateMFA,
		}
	];

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			scrollBehavior={"inside"}
			closeOnEsc={true}
			size={{base: "xs", md: "lg"}}
		>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader className={"prevent-select"} alignItems={"center"} justifyContent="center">
					{t("home.Add")}
				</ModalHeader>
				<ModalCloseButton my={2}/>
				<Divider mb={'1rem'}/>
				<ModalBody px={isPhone ? 4 : 8} py={isPhone ? 2 : 2}>
					<Tabs
						isFitted
						colorScheme={"gray"}
						defaultIndex={currentTab}
						onChange={(tabNumber: number): void => setCurrentTab(tabNumber)}
					>
						<TabList>
							<Tab>{t("addPanels.Job")}</Tab>
							<Tab>{t("addPanels.Connection")}</Tab>
							<Tab>{t("addPanels.Future Application")}</Tab>
						</TabList>
						<TabPanels>
							<AddMyJobTabPanel
								myJobMethods={myJobMethods}
								myJobDateSelects={jobDateSelects}
								userLocale={userLocale}
								dateApplied={dateApplied}
								statuses={statuses}
								handleMyJobSave={handleMyJobSave}
							/>
							<AddMyConnectionTabPanel
								myConnectionMethods={myConnectionMethods}
								myConnectionDateSelects={myConnectionDateSelects}
								userLocale={userLocale}
								handleMyConnectionSave={handleMyConnectionSave}
							/>
							<AddMyFutureApplicationTabPanel
								myFutureApplicationMethods={myFutureApplicationMethods}
								myFutureApplicationsDateSelects={myFutureApplicationsDateSelects}
								userLocale={userLocale}
								handleToApplySave={handleToApplySave}
							/>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default AddListingModal;