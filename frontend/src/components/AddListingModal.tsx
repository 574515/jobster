import React from "react";

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
import {
	AddEditJobType,
	AddEditPoolType,
	AddEditToApplyType,
	DateSelectType,
	JobCreationResponseModel,
	ModalSelectType,
	MyFutureApplicationResponseModel,
	PoolCreationResponseModel,
	TransformedAddEditJobProps,
	TransformedAddEditPoolType,
	TransformedAddEditToApplyType
} from "../models/componentsTypes.ts";
import {InputControl, ResetButton, SubmitButton, TextareaControl} from "react-hook-form-chakra";
import CustomFormProvider from "./customComponents/CustomFormProvider.tsx";
import {Constants, homeScreenPages, jobListingCategories, statusesToSet} from "../helpers/constants.ts";
import CustomSelect from "./customComponents/CustomSelect.tsx";
import {ConnectionActions, JobActions, ToApplyActions} from "./AppActions.action.ts";
import {toast} from "../helpers/customToast.ts";
import {AddEditJobModalProps} from "../models/interfaces.ts";
import CustomDateSelect from "./customComponents/CustomDateSelect.tsx";
import {useSetRecoilState} from "recoil";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";

const AddListingModal: React.FC<AddEditJobModalProps> = (
	{
		isOpen, onClose, user,
		getAllMyJobListings, getAllMyConnections, getAllMyToApply,
		jobMethods, poolMethods, toApplyMethods
	}
) => {
	const setHomeScreenState = useSetRecoilState(homeScreenAtom);
	const handleJobReset = () => {
		if (jobMethods) jobMethods.reset();
	}
	const handlePoolReset = () => {
		if (poolMethods) poolMethods.reset();
	}
	const handleMyFutureApplicationsReset = () => {
		if (toApplyMethods) toApplyMethods.reset();
	}
	const [statuses, setStatuses] = React.useState<ModalSelectType[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [dateApplied, setDateApplied] = React.useState<Date>(new Date());
	const [closingDate, setClosingDate] = React.useState<Date>(new Date());
	const [closingDateMFA, setClosingDateMFA] = React.useState<Date>(new Date());
	const [dateSent, setDateSent] = React.useState<Date>(new Date());
	const [tomorrowDate, setTomorrowDate] = React.useState<Date>(new Date(+new Date() + Constants.DAY_IN_MILLISECONDS));

	React.useEffect(() => setStatuses(statusesToSet), []);

	React.useEffect(() => {
		if (!tomorrowDate)
			setTomorrowDate(new Date(+new Date() + Constants.DAY_IN_MILLISECONDS));
	}, [tomorrowDate]);

	const handleJobSave = (data: AddEditJobType) => {
		setIsLoading(true);
		const transformedData: TransformedAddEditJobProps = {
			company: data.company,
			jobTitle: data.jobTitle,
			jobLink: data.jobLink,
			description: data.description,
			category: data.category,
			status: data.status,
			userId: user._id,
			dateApplied: data.dateApplied,
			closingDate: data.closingDate,
		};
		JobActions
			.postMyNewJob(transformedData)
			.then((response: JobCreationResponseModel) => {
				void toast(`Job "${response.name}" Added Successfully`, 'success');
				getAllMyJobListings();
				setHomeScreenState(homeScreenPages.MY_JOBS);
				onClose();
				handleJobReset();
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	};

	const handlePoolSave = (data: AddEditPoolType) => {
		setIsLoading(true);
		const transformedData: TransformedAddEditPoolType = {
			company: data.company,
			jobLink: data.jobLink,
			dateSent: data.dateSent,
			userId: user._id,
		};
		ConnectionActions
			.postMyConnection(transformedData)
			.then((response: PoolCreationResponseModel) => {
				void toast(`Connection For "${response.company}" Added Successfully`, 'success');
				onClose();
				handlePoolReset();
				getAllMyConnections();
				setHomeScreenState(homeScreenPages.MY_CONNECTIONS);
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	};

	const handleToApplySave = (data: AddEditToApplyType) => {
		setIsLoading(true);
		const transformedData: TransformedAddEditToApplyType = {
			company: data.company,
			jobLink: data.jobLink,
			jobTitle: data.jobTitle,
			closingDate: data.closingDate,
			userId: user._id,
		};
		ToApplyActions
			.postMyToApply(transformedData)
			.then((response: MyFutureApplicationResponseModel) => {
				void toast(`My Future Application for ${response.jobLink} Added Successfully`, 'success');
				onClose();
				handleMyFutureApplicationsReset();
				getAllMyToApply();
				setHomeScreenState(homeScreenPages.MY_FUTURE_APPLICATIONS);
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	}

	const jobDateSelects: DateSelectType[] = [
		{
			label: "Applied Date",
			name: "dateApplied",
			definedDate: dateApplied,
			setDate: setDateApplied,
		},
		{
			label: "Closing Date",
			name: "closingDate",
			definedDate: closingDate,
			setDate: setClosingDate,
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
					<Tabs isFitted colorScheme={"gray"}>
						<TabList>
							<Tab>Job</Tab>
							<Tab>Connection</Tab>
							<Tab>Future Application</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<CustomFormProvider formProviderData={jobMethods}>
									<VStack
										as="form"
										onSubmit={jobMethods.handleSubmit(handleJobSave)}
									>
										<InputControl
											py={2}
											className="prevent-select"
											name="company"
											label="Company"
											inputProps={{
												placeholder: 'Company',
												maxLength: 64, // TODO: Apply the rules
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
											<TextareaControl name={'description'}/>
										</FormControl>
										<CustomSelect
											name={"category"}
											className={"prevent-select"}
											py={2}
											choices={jobListingCategories}
											label={"Job Category"}
											control={jobMethods.control}
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
													jobControl={jobMethods.control}
													className={"prevent-select"}
													percentWidth={100}
													isRequired={true}
												/>
											))}
										</HStack>
										<CustomSelect
											name={"status"}
											className={"prevent-select"}
											py={2}
											choices={statuses}
											label={"Job Status"}
											control={jobMethods.control}
											isRequired={true}
										/>
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
												onClick={handleJobReset}
												colorScheme={"red"}
												variant={"outline"}
											>Reset</ResetButton>
										</ButtonGroup>
									</VStack>
								</CustomFormProvider>
							</TabPanel>
							<TabPanel>
								<CustomFormProvider formProviderData={poolMethods}>
									<VStack
										as="form"
										onSubmit={poolMethods.handleSubmit(handlePoolSave)}
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
													poolControl={poolMethods.control}
													className={"prevent-select"}
													percentWidth={100}
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
												onClick={handlePoolReset}
												colorScheme={"red"}
												variant={"outline"}
											>Reset</ResetButton>
										</ButtonGroup>
									</VStack>
								</CustomFormProvider>
							</TabPanel>
							<TabPanel>
								<CustomFormProvider formProviderData={toApplyMethods}>
									<VStack
										as="form"
										onSubmit={toApplyMethods.handleSubmit(handleToApplySave)}
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
													jobControl={jobMethods.control}
													className={"prevent-select"}
													percentWidth={100}
													minDate={new Date()}
													definedDate={tomorrowDate}
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
												onClick={handleJobReset}
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