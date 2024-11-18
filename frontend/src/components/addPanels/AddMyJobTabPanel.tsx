import React from "react";

import loadingAtom from "../../atoms/loadingAtom.ts";
import CustomFormProvider from "../customComponents/CustomFormProvider.tsx";

import {
	ButtonGroup,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	TabPanel,
	VStack
} from "@chakra-ui/react";
import {InputControl, ResetButton, SubmitButton, TextareaControl} from "react-hook-form-chakra";
import {Controller} from "react-hook-form";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {CategorySelectionModel, DateSelectType} from "../../models/types.ts";
import {useRecoilValue} from "recoil";
import {AddMyJobTabPanelProps} from "../../models/interfaces.ts";
import {CreatableSelect, GroupBase, Select} from "chakra-react-select";
import {jobListingCategories} from "../../helpers/categories.ts";
import {FaCaretRight} from "react-icons/fa6";

const AddMyJobTabPanel: React.FC<AddMyJobTabPanelProps> = (
	{
		myJobMethods, myJobDateSelects, userLocale,
		dateApplied, statuses, handleMyJobSave
	}
) => {
	const isLoading = useRecoilValue<boolean>(loadingAtom);

	const formatGroupLabel = (data: GroupBase<CategorySelectionModel>) => (
		<span className={"customSelectGroupLabel"}><FaCaretRight/>&nbsp;{data.label}</span>
	);

	return (
		<TabPanel>
			<CustomFormProvider formProviderData={myJobMethods}>
				<VStack as="form" onSubmit={myJobMethods.handleSubmit(handleMyJobSave)}>
					<InputControl
						py={2}
						className="prevent-select"
						name="company"
						label="Company"
						inputProps={{placeholder: 'Company'}}
						isRequired
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobTitle"
						label="Job Title"
						inputProps={{placeholder: 'Job Title'}}
						isRequired
					/>
					<FormControl py={2} className={"prevent-select"}>
						<FormLabel>Job Description</FormLabel>
						<TextareaControl
							name={'description'}
							textareaProps={{placeholder: 'Job Description'}}
						/>
					</FormControl>
					<Controller
						name={"category"}
						render={(
							{
								field: {onChange, onBlur, name, ref, value},
								fieldState: {error},
							}) => (
							<FormControl
								py={2}
								className={"prevent-select"}
								isInvalid={!!error}
								id={name}
							>
								<FormLabel>Job Category</FormLabel>
								<CreatableSelect
									isLoading={isLoading}
									isDisabled={isLoading}
									menuPlacement="auto"
									name={name}
									placeholder={"Select or Add Your Own Category"}
									ref={ref}
									onChange={(selectedOptions) => onChange(selectedOptions)}
									onBlur={onBlur}
									closeMenuOnSelect={false}
									options={jobListingCategories}
									isClearable
									isMulti
									formatGroupLabel={formatGroupLabel}
									value={value || []}
									onCreateOption={(inputValue) => {
										const newOption: CategorySelectionModel = {
											label: inputValue[0].toUpperCase() + inputValue.slice(1),
											value: inputValue,
											color: "#26A69A",
										};
										const updatedSelections = [...(value || []), newOption];
										onChange(updatedSelections);
									}}
									isOptionDisabled={(option: CategorySelectionModel) =>
										(value && value.length >= 5) &&
										!value.some((v: CategorySelectionModel) => v.value === option.value)
									}
								/>
								<FormErrorMessage>{error && error.message}</FormErrorMessage>
							</FormControl>
						)}
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobLink"
						label="Job Link"
						inputProps={{placeholder: 'https://linktojob.com'}}
					/>
					<HStack w={"100%"} py={2}>
						{myJobDateSelects.map((date: DateSelectType, index: number) => (
							<Controller
								key={index}
								name={date.name}
								render={({field}) => (
									<FormControl
										py={4}
										className={"prevent-select"}
										textAlign={"center"}
										isRequired={date.isRequired}
									>
										{date.label && <FormLabel mx={0}>{date.label}</FormLabel>}
										<HStack>
											<SingleDatepicker
												date={field.value}
												onDateChange={(fieldDate) => {
													date.setDate(fieldDate);
													field.onChange(fieldDate);
												}}
												configs={{dateFormat: TIME_FORMATS[userLocale],}}
												propsConfigs={{triggerBtnProps: {width: "100%"}}}
												disabled={date.hasCheckbox ? !date.hasClosingDate : false}
												minDate={date.hasClosingDate ? dateApplied : undefined}
											/>
											{date.hasCheckbox && (
												<Checkbox
													onChange={() => {
														if (date.setHasClosingDate)
															date.setHasClosingDate(!date.hasClosingDate);
													}}
												/>
											)}
										</HStack>
									</FormControl>
								)}
							/>
						))}
					</HStack>
					<Controller
						name={"status"}
						render={({field, fieldState: {error}}) => (
							<FormControl
								py={2}
								className={"prevent-select"}
								isInvalid={!!error}
								id={"status"}
								isRequired={true}
							>
								<FormLabel>Job Status</FormLabel>
								<Select
									placeholder={"Select Status"}
									menuPlacement={"auto"}
									onChange={field.onChange}
									options={statuses}
									value={field.value}
								/>
								<FormErrorMessage>{error && error.message}</FormErrorMessage>
							</FormControl>
						)}
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
							onClick={() => myJobMethods.reset()}
							colorScheme={"red"}
							variant={"outline"}
						>Reset</ResetButton>
					</ButtonGroup>
				</VStack>
			</CustomFormProvider>
		</TabPanel>
	)
}

export default AddMyJobTabPanel;