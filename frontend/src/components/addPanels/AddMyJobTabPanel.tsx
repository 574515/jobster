import React from "react";

import loadingAtom from "../../atoms/loadingAtom.ts";
import CustomFormProvider from "../customComponents/CustomFormProvider.tsx";
import CustomTagSelect from "../customComponents/CustomTagSelect.tsx";
import CustomSelect from "../customComponents/CustomSelect.tsx";

import {ButtonGroup, Checkbox, FormControl, FormLabel, HStack, TabPanel, VStack} from "@chakra-ui/react";
import {InputControl, ResetButton, SubmitButton, TextareaControl} from "react-hook-form-chakra";
import {jobListingCategories} from "../../helpers/categories.ts";
import {Controller} from "react-hook-form";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {DateSelectType} from "../../models/types.ts";
import {useRecoilValue} from "recoil";
import {AddMyJobTabPanelProps} from "../../models/interfaces.ts";

const AddMyJobTabPanel: React.FC<AddMyJobTabPanelProps> = (
	{
		myJobMethods, myJobDateSelects, userLocale,
		dateApplied, statuses, handleMyJobSave
	}
) => {
	const isLoading = useRecoilValue<boolean>(loadingAtom);

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