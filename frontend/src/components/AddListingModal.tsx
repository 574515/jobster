import React from "react";

import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import loadingAtom from "../atoms/loadingAtom.ts";
import userLocaleAtom from "../atoms/userLocaleAtom.ts";
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

const AddListingModal: React.FC<AddEditJobModalProps> = (
	{
		isOpen, onClose, user, getAllMyJobs, getAllMyConnections,
		getAllMyFutureApplications, myJobMethods, myConnectionMethods, myFutureApplicationMethods
	}
) => {
	const userLocale = useRecoilValue<string>(userLocaleAtom);
	const [homeScreenState, setHomeScreenState] = useRecoilState<string>(homeScreenAtom);
	const [currentTab, setCurrentTab] = React.useState<number>(0);
	const [statuses, setStatuses] = React.useState<ModalSelectType[]>([]);
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const [dateApplied, setDateApplied] = React.useState<Date>(new Date());
	const [closingDate, setClosingDate] = React.useState<Date>(new Date());
	const [closingDateMFA, setClosingDateMFA] = React.useState<Date>(new Date(+new Date() + Constants.DAY_IN_MILLISECONDS));
	const [dateSent, setDateSent] = React.useState<Date>(new Date());
	const [hasClosingDate, setHasClosingDate] = React.useState<boolean>(false);

	React.useEffect(() => setStatuses(statusesToSet), []);

	React.useEffect(() => setCurrentTab(addModalTabs[homeScreenState]), [homeScreenState]);

	const handleMyJobSave = (data: MyJobRequestModel) => {
		setIsLoading(true);
		const newCategories: CategorySelectionModel[] = [];
		data?.category?.map((cat: CategorySelectionModel) => {
			if (!cat.color) cat.color = "#FF0000";
			newCategories.push(cat);
		});
		const transformedData: MyJobTransformedRequestModel = {
			company: data.company,
			jobTitle: data.jobTitle,
			jobLink: data.jobLink,
			description: data.description,
			category: newCategories ?? data.category,
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
				void toast(`Job "${response.jobTitle}" Added Successfully`, 'success');
				myJobMethods.reset();
				setDateApplied(new Date());
				setClosingDate(new Date());
				getAllMyJobs();
				setHomeScreenState(homeScreenPages.MY_JOBS);
			})
			.catch((err) => void toast(err.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
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
				void toast(`Connection For "${response.company}" Added Successfully`, 'success');
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
				void toast(`My Future Application for ${response.jobLink} Added Successfully`, 'success');
				myFutureApplicationMethods.reset();
				getAllMyFutureApplications();
				setHomeScreenState(homeScreenPages.MY_FUTURE_APPLICATIONS);
			})
			.catch((err) => void toast(err.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	}

	const jobDateSelects: DateSelectType[] = [
		{
			label: "Applied Date",
			name: "dateApplied",
			definedDate: dateApplied,
			isRequired: true,
			setDate: setDateApplied,
		},
		{
			label: "Closing Date",
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
			label: "Date Sent",
			name: "dateSent",
			definedDate: dateSent,
			setDate: setDateSent,
		},
	];

	const myFutureApplicationsDateSelects: DateSelectType[] = [
		{
			label: "Closing Date",
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
			size={"xl"}
		>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader className={"prevent-select"} alignItems={"center"} justifyContent="center">
					Add
				</ModalHeader>
				<ModalCloseButton my={2}/>
				<Divider mb={'1rem'}/>
				<ModalBody>
					<Tabs
						isFitted
						colorScheme={"gray"}
						defaultIndex={currentTab}
						onChange={(tabNumber: number): void => setCurrentTab(tabNumber)}
					>
						<TabList>
							<Tab>Job</Tab>
							<Tab>Connection</Tab>
							<Tab>Future Application</Tab>
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