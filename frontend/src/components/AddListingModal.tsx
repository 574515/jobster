import React from "react";

import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import CustomDateSelect from "./customComponents/CustomDateSelect.tsx";
import CustomFormProvider from "./customComponents/CustomFormProvider.tsx";
import CustomSelect from "./customComponents/CustomSelect.tsx";
import CustomTagSelect from "./customComponents/CustomTagSelect.tsx";

import {
	ButtonGroup,
	Divider,
	FormControl,
	FormLabel,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	VStack
} from "@chakra-ui/react";
import {DateSelectType,} from "../models/componentsTypes.ts";
import {InputControl, ResetButton, SubmitButton, TextareaControl} from "react-hook-form-chakra";
import {addModalTabs, Constants, homeScreenPages, statusesToSet} from "../helpers/constants.ts";
import {ConnectionActions, JobActions, ToApplyActions} from "./AppActions.action.ts";
import {toast} from "../helpers/customToast.ts";
import {AddEditJobModalProps} from "../models/interfaces.ts";
import {useRecoilState} from "recoil";
import {
	MyConnectionRequestModel,
	MyConnectionResponseModel,
	MyConnectionTransformedRequestModel,
	MyFutureApplicationRequestModel,
	MyFutureApplicationResponseModel,
	MyFutureApplicationTransformedRequestModel,
	MyJobRequestModel,
	MyJobResponseModel,
	MyJobTransformedRequestModel
} from "../models/types.ts";
import {CategorySelectionModel, ModalSelectType} from "../models/customComponentsTypes.ts";
import {jobListingCategories} from "../helpers/categories.ts";

const AddListingModal: React.FC<AddEditJobModalProps> = (
	{
		isOpen, onClose, user, getAllMyJobs, getAllMyConnections,
		getAllMyFutureApplications, myJobMethods, myConnectionMethods, myFutureApplicationMethods
	}
) => {
	const [homeScreenState, setHomeScreenState] = useRecoilState<string>(homeScreenAtom);
	const [currentTab, setCurrentTab] = React.useState<number>(0);
	const [statuses, setStatuses] = React.useState<ModalSelectType[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [dateApplied, setDateApplied] = React.useState<Date>(new Date());
	const [closingDate, setClosingDate] = React.useState<Date>(new Date());
	const [closingDateMFA, setClosingDateMFA] = React.useState<Date>(new Date(+new Date() + Constants.DAY_IN_MILLISECONDS));
	const [dateSent, setDateSent] = React.useState<Date>(new Date());
	const [hasClosingDate, setHasClosingDate] = React.useState<boolean>(false);

	React.useEffect(() => setStatuses(statusesToSet), []);

	React.useEffect(() => setCurrentTab(addModalTabs[homeScreenState]), [homeScreenState]);

	const handleReset = () => {
		myJobMethods.reset();
		myConnectionMethods.reset();
		myFutureApplicationMethods.reset();
	};
	const handleMyJobSave = (data: MyJobRequestModel) => {
		setIsLoading(true);
		const newCategories: CategorySelectionModel[] = [];
		data.category.map((cat: CategorySelectionModel) => {
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
			closingDate: hasClosingDate ? data.closingDate : "",
			note: data.note ?? null,
		};
		JobActions
			.postMyNewJob(transformedData)
			.then((response: MyJobResponseModel): void => {
				onClose();
				void toast(`Job "${response.jobTitle}" Added Successfully`, 'success');
				handleReset();
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
				handleReset();
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
				handleReset();
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

	const poolDateSelects: DateSelectType[] = [
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
							<TabPanel>
								<CustomFormProvider formProviderData={myJobMethods}>
									<VStack as="form" onSubmit={myJobMethods.handleSubmit(handleMyJobSave)}>
										<InputControl
											py={2}
											className="prevent-select"
											name="company"
											label="Company"
											inputProps={{
												placeholder: 'Company',
											}}
											isRequired
										/>
										<InputControl
											py={2}
											className="prevent-select"
											name="jobTitle"
											label="Job Title"
											inputProps={{
												placeholder: 'Job Title',
											}}
											isRequired
										/>
										<FormControl py={2} className={"prevent-select"}>
											<FormLabel>Job Description</FormLabel>
											<TextareaControl
												name={'description'}
												textareaProps={{
													placeholder: 'Job Description',
												}}
											/>
										</FormControl>
										<CustomTagSelect
											name={"category"}
											className={"prevent-select"}
											py={2}
											choices={jobListingCategories}
											label={"Job Category"}
											control={myJobMethods.control}
										/>
										<InputControl
											py={2}
											className="prevent-select"
											name="jobLink"
											label="Job Link"
											inputProps={{
												placeholder: 'https://linktojob.com',
											}}
										/>
										<HStack w={"100%"} py={2}>
											{jobDateSelects.map((date, index: number) => (
												<CustomDateSelect
													key={index}
													{...date}
													control={myJobMethods.control}
													className={"prevent-select"}
												/>
											))}
										</HStack>
										<CustomSelect
											name={"status"}
											className={"prevent-select"}
											py={2}
											choices={statuses}
											label={"Job Status"}
											control={myJobMethods.control}
											isRequired={true}
											placeholder={"Select Status"}
										/>
										<FormControl py={2} className={"prevent-select"}>
											<FormLabel>Note</FormLabel>
											<TextareaControl name={'note'}/>
										</FormControl>
										<ButtonGroup my={2} w={"100%"}>
											<SubmitButton
												isLoading={isLoading}
												loadingText="Submitting..."
												width="full"
												colorScheme={"green"}
												variant={"outline"}
											>
												Save
											</SubmitButton>
											<ResetButton
												isLoading={isLoading}
												width="full"
												onClick={handleReset}
												colorScheme={"red"}
												variant={"outline"}
											>Reset</ResetButton>
										</ButtonGroup>
									</VStack>
								</CustomFormProvider>
							</TabPanel>
							<TabPanel>
								<CustomFormProvider formProviderData={myConnectionMethods}>
									<VStack
										as="form"
										onSubmit={myConnectionMethods.handleSubmit(handleMyConnectionSave)}
									>
										<InputControl
											pt={4}
											pb={2}
											className="prevent-select"
											name="company"
											label="Company"
											inputProps={{
												placeholder: 'Company',
											}}
											isRequired={true}
										/>
										<InputControl
											py={2}
											className="prevent-select"
											name="jobLink"
											label="Job Link"
											inputProps={{
												placeholder: 'https://linktojob.com',
											}}
										/>
										<HStack w={"100%"} py={2}>
											{poolDateSelects.map((date, index: number) => (
												<CustomDateSelect
													key={index}
													{...date}
													control={myConnectionMethods.control}
													className={"prevent-select"}
												/>
											))}
										</HStack>
										<ButtonGroup my={2} w={"100%"}>
											<SubmitButton
												isLoading={isLoading}
												loadingText="Submitting..."
												width="full"
												colorScheme={"green"}
												variant={"outline"}
											>
												Save
											</SubmitButton>
											<ResetButton
												isLoading={isLoading}
												width="full"
												onClick={handleReset}
												colorScheme={"red"}
												variant={"outline"}
											>Reset</ResetButton>
										</ButtonGroup>
									</VStack>
								</CustomFormProvider>
							</TabPanel>
							<TabPanel>
								<CustomFormProvider formProviderData={myFutureApplicationMethods}>
									<VStack
										as="form"
										onSubmit={myFutureApplicationMethods.handleSubmit(handleToApplySave)}
									>
										<InputControl
											py={2}
											className="prevent-select"
											name="company"
											label="Company"
											inputProps={{
												placeholder: 'Company',
											}}
										/>
										<InputControl
											py={2}
											className="prevent-select"
											name="jobTitle"
											label="Job Title"
											inputProps={{
												placeholder: 'Job Title',
											}}
										/>
										<InputControl
											py={2}
											className="prevent-select"
											name="jobLink"
											label="Job Link"
											inputProps={{
												placeholder: 'https://linktojob.com',
											}}
											isRequired
										/>
										<HStack w={"100%"} py={2}>
											{myFutureApplicationsDateSelects.map((date, index: number) => (
												<CustomDateSelect
													key={index}
													{...date}
													control={myFutureApplicationMethods.control}
													className={"prevent-select"}
													minDate={new Date()}
												/>
											))}
										</HStack>
										<ButtonGroup my={2} w={"100%"}>
											<SubmitButton
												isLoading={isLoading}
												loadingText="Submitting..."
												width="full"
												colorScheme={"green"}
												variant={"outline"}
											>
												Save
											</SubmitButton>
											<ResetButton
												isLoading={isLoading}
												width="full"
												onClick={handleReset}
												colorScheme={"red"}
												variant={"outline"}
											>Reset</ResetButton>
										</ButtonGroup>
									</VStack>
								</CustomFormProvider>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default AddListingModal;