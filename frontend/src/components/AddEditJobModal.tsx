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
	VStack
} from "@chakra-ui/react";
import {
	AddEditJobProps,
	JobCreationResponseModel,
	ModalSelectType,
	TransformedAddEditJobProps
} from "../models/componentsTypes.ts";
import {InputControl, ResetButton, SubmitButton, TextareaControl} from "react-hook-form-chakra";
import CustomFormProvider from "./customComponents/CustomFormProvider.tsx";
import {jobListingCategories, statusesToSet} from "../helpers/constants.ts";
import CustomSelect from "./customComponents/CustomSelect.tsx";
import {JobActions} from "./JobActions.action.ts";
import {toast} from "../helpers/customToast.ts";
import {AddEditJobModalProps} from "../models/interfaces.ts";
import CustomDateSelect from "./customComponents/CustomDateSelect.tsx";

const AddEditJobModal: React.FC<AddEditJobModalProps> = (
	{isOpen, onClose, user, getAllListings, methods}
) => {
	const handleReset = () => methods.reset();
	const [statuses, setStatuses] = React.useState<ModalSelectType[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [dateApplied, setDateApplied] = React.useState<Date>(new Date());
	const [closingDate, setClosingDate] = React.useState<Date>(new Date());

	React.useEffect(() => setStatuses(statusesToSet), []);

	const handleSave = (data: AddEditJobProps) => {
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
		console.log(transformedData)
		JobActions
			.postNewJob(transformedData)
			.then((response: JobCreationResponseModel) => {
				void toast(`Job "${response.name}" Added Successfully`, 'success');
				getAllListings();
				onClose();
				handleReset();
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	};

	const dateSelects = [
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

	return (
		<CustomFormProvider formProviderData={methods}>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				scrollBehavior={"inside"}
				closeOnEsc={true}
			>
				<ModalOverlay/>
				<ModalContent borderRadius={0}>
					<ModalHeader alignItems={"center"} justifyContent="center">
						Add Listing
					</ModalHeader>
					<ModalCloseButton my={2}/>
					<Divider mb={'1rem'}/>
					<ModalBody>
						<VStack
							as="form"
							onSubmit={methods.handleSubmit(handleSave)}
						>
							<InputControl
								py={4}
								className="prevent-select"
								name="company"
								label="Company"
								inputProps={{
									placeholder: 'Company',
								}}
							/>
							<InputControl
								py={4}
								className="prevent-select"
								name="jobTitle"
								label="Job Title"
								inputProps={{
									placeholder: 'Job Title',
								}}
							/>
							<CustomSelect
								name={"category"}
								className={"prevent-select"}
								py={4}
								choices={jobListingCategories}
								label={"Category"}
								control={methods.control}
							/>
							<FormControl py={4} className={"prevent-select"}>
								<FormLabel>Description</FormLabel>
								<TextareaControl name={'description'}/>
							</FormControl>
							<InputControl
								py={4}
								className="prevent-select"
								name="jobLink"
								label="Link"
								inputProps={{
									placeholder: 'https://linktojob.com',
								}}
							/>
							<HStack w={"100%"}>
								{dateSelects.map((date, index: number) => (
									<CustomDateSelect
										key={index}
										{...date}
										control={methods.control}
										className={"prevent-select"}
										py={4}
									/>
								))}
							</HStack>
							<CustomSelect
								name={"status"}
								className={"prevent-select"}
								py={4}
								choices={statuses}
								label={"Status"}
								control={methods.control}
							/>
							<ButtonGroup mb={8} w={"75%"}>
								<SubmitButton
									isLoading={isLoading}
									loadingText="Submitting..."
									width="full"
									colorScheme={"green"}
									variant={"outline"}
								>Save Listing</SubmitButton>
								<ResetButton
									isLoading={isLoading}
									width="full"
									onClick={handleReset}
									colorScheme={"red"}
									variant={"outline"}
								>Reset</ResetButton>
							</ButtonGroup>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</CustomFormProvider>
	);
}

export default AddEditJobModal;