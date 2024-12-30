import {FC} from "react";

import CustomFormProvider from "../customComponents/CustomFormProvider.tsx";
import CustomSubmitButtonGroup from "../customComponents/CustomSubmitButtonGroup.tsx";

import {FormControl, FormLabel, HStack, TabPanel, VStack} from "@chakra-ui/react";
import {InputControl} from "react-hook-form-chakra";
import {Controller} from "react-hook-form";
import {DateSelectType} from "../../models/types.ts";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {AddMyConnectionTabPanelProps} from "../../models/interfaces.ts";
import {useTranslation} from "react-i18next";

const AddMyConnectionTabPanel: FC<AddMyConnectionTabPanelProps> = (
	{myConnectionMethods, myConnectionDateSelects, userLocale, handleMyConnectionSave}
) => {
	const {t} = useTranslation();

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
						label={t("addPanels.Company")}
						inputProps={{placeholder: t("addPanels.Company")}}
						isRequired={true}
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobLink"
						label={t("addPanels.JobLink")}
						inputProps={{placeholder: 'https://linktojob.com'}}
					/>
					<HStack w={"100%"}>
						{myConnectionDateSelects.map((date: DateSelectType, index: number) => (
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
										{date.label && <FormLabel mx={0}>{t(date.label)}</FormLabel>}
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
					<CustomSubmitButtonGroup resetMethod={myConnectionMethods.reset}/>
				</VStack>
			</CustomFormProvider>
		</TabPanel>
	)
}

export default AddMyConnectionTabPanel;