import React from "react";
import CustomFormProvider from "../customComponents/CustomFormProvider.tsx";

import {FormControl, FormLabel, HStack, TabPanel, VStack} from "@chakra-ui/react";
import {InputControl} from "react-hook-form-chakra";
import {Controller} from "react-hook-form";
import {DateSelectType} from "../../models/types.ts";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {AddMyFutureApplicationTabPanelProps} from "../../models/interfaces.ts";
import {useTranslation} from "react-i18next";
import CustomSubmitButtonGroup from "../customComponents/CustomSubmitButtonGroup.tsx";

const AddMyFutureApplicationTabPanel: React.FC<AddMyFutureApplicationTabPanelProps> = (
	{myFutureApplicationMethods, myFutureApplicationsDateSelects, userLocale, handleToApplySave}
) => {
	const {t} = useTranslation();

	return (
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
						label={t("addPanels.Company")}
						inputProps={{placeholder: t("addPanels.Company")}}
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobTitle"
						label={t("addPanels.JobTitle")}
						inputProps={{placeholder: t("addPanels.JobTitle")}}
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobLink"
						label={t("addPanels.JobLink")}
						inputProps={{placeholder: t("addPanels.JobLink")}}
						isRequired
					/>
					<HStack w={"100%"}>
						{myFutureApplicationsDateSelects.map((date: DateSelectType, index: number) => (
							<Controller
								key={index}
								name={date.name}
								render={({field}) => (
									<FormControl
										py={2}
										className={"prevent-select"}
										textAlign={"center"}
										isRequired={date.isRequired}
									>
										{date.label && <FormLabel mx={0}>{t(`filters.${date.label}`)}</FormLabel>}
										<HStack>
											<SingleDatepicker
												date={field.value}
												onDateChange={(fieldDate) => {
													field.onChange(fieldDate);
													date.setDate(fieldDate);
												}}
												configs={{dateFormat: TIME_FORMATS[userLocale],}}
												propsConfigs={{triggerBtnProps: {width: "100%"}}}
												minDate={new Date()}
											/>
										</HStack>
									</FormControl>
								)}
							/>
						))}
					</HStack>
					<CustomSubmitButtonGroup resetMethod={myFutureApplicationMethods.reset}/>
				</VStack>
			</CustomFormProvider>
		</TabPanel>
	);
}

export default AddMyFutureApplicationTabPanel;