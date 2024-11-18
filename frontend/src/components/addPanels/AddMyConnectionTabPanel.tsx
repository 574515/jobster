import React from "react";

import loadingAtom from "../../atoms/loadingAtom.ts";
import CustomFormProvider from "../customComponents/CustomFormProvider.tsx";

import {ButtonGroup, FormControl, FormLabel, HStack, TabPanel, VStack} from "@chakra-ui/react";
import {InputControl, ResetButton, SubmitButton} from "react-hook-form-chakra";
import {Controller} from "react-hook-form";
import {DateSelectType} from "../../models/types.ts";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {AddMyConnectionTabPanelProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";

const AddMyConnectionTabPanel: React.FC<AddMyConnectionTabPanelProps> = (
	{myConnectionMethods, myConnectionDateSelects, userLocale, handleMyConnectionSave}
) => {
	const isLoading = useRecoilValue<boolean>(loadingAtom);

	return (
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
						inputProps={{placeholder: 'Company'}}
						isRequired={true}
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobLink"
						label="Job Link"
						inputProps={{placeholder: 'https://linktojob.com'}}
					/>
					<HStack w={"100%"} py={2}>
						{myConnectionDateSelects.map((date: DateSelectType, index: number) => (
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
													field.onChange(fieldDate);
													date.setDate(fieldDate);
												}}
												configs={{dateFormat: TIME_FORMATS[userLocale],}}
												propsConfigs={{triggerBtnProps: {width: "100%"}}}
											/>
										</HStack>
									</FormControl>
								)}
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
							onClick={() => myConnectionMethods.reset()}
							colorScheme={"red"}
							variant={"outline"}
						>Reset</ResetButton>
					</ButtonGroup>
				</VStack>
			</CustomFormProvider>
		</TabPanel>
	)
}

export default AddMyConnectionTabPanel;