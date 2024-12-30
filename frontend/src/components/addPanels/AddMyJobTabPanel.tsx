import {FC} from "react";

import isPhoneAtom from "../../atoms/isPhoneAtom.ts";
import loadingAtom from "../../atoms/loadingAtom.ts";
import CustomFormProvider from "../customComponents/CustomFormProvider.tsx";
import CustomSubmitButtonGroup from "../customComponents/CustomSubmitButtonGroup.tsx";

import {Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, HStack, TabPanel, VStack} from "@chakra-ui/react";
import {InputControl, TextareaControl} from "react-hook-form-chakra";
import {Controller} from "react-hook-form";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {CategorySelectionModel, DateSelectType} from "../../models/types.ts";
import {useRecoilValue} from "recoil";
import {AddMyJobTabPanelProps} from "../../models/interfaces.ts";
import {CreatableSelect, GroupBase, Select} from "chakra-react-select";
import {jobListingCategories} from "../../helpers/categories.ts";
import {FaCaretRight} from "react-icons/fa6";
import {useTranslation} from "react-i18next";

const AddMyJobTabPanel: FC<AddMyJobTabPanelProps> = (
	{
		myJobMethods, myJobDateSelects, userLocale,
		dateApplied, statuses, handleMyJobSave
	}
) => {
	const isLoading = useRecoilValue<boolean>(loadingAtom);
	const isPhone = useRecoilValue<boolean>(isPhoneAtom);
	const {t} = useTranslation();

	const formatGroupLabel = (data: GroupBase<CategorySelectionModel>) => (
		<span className={"customSelectGroupLabel"}><FaCaretRight/>&nbsp;{data.label}</span>
	);

	return (
		<TabPanel px={isPhone ? "unset" : "initial"} py={2}>
			<CustomFormProvider formProviderData={myJobMethods}>
				<VStack as="form" onSubmit={myJobMethods.handleSubmit(handleMyJobSave)}>
					<InputControl
						py={2}
						className="prevent-select"
						name="company"
						label={t("addPanels.Company")}
						inputProps={{placeholder: t("addPanels.Company")}}
						isRequired
					/>
					<InputControl
						py={2}
						className="prevent-select"
						name="jobTitle"
						label={t("addPanels.JobTitle")}
						inputProps={{placeholder: t("addPanels.JobTitle")}}
						isRequired
					/>
					<FormControl py={2} className={"prevent-select"}>
						<FormLabel>{t("addPanels.JobDescription")}</FormLabel>
						<TextareaControl
							name={'description'}
							textareaProps={{placeholder: t("addPanels.JobDescription")}}
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
								<FormLabel>{t("addPanels.JobCategory")}</FormLabel>
								<CreatableSelect
									isLoading={isLoading}
									isDisabled={isLoading}
									menuPlacement="auto"
									name={name}
									placeholder={t("addPanels.jobCategoryPlaceholder")}
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
						label={t("addPanels.JobLink")}
						inputProps={{placeholder: 'https://linktojob.com'}}
					/>
					<Flex w={"100%"} columnGap={4} flexDirection={isPhone ? "column" : "row"}>
						{myJobDateSelects.map((date: DateSelectType, index: number) => (
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
													isChecked={date.hasClosingDate}
												/>
											)}
										</HStack>
									</FormControl>
								)}
							/>
						))}
					</Flex>
					<Controller
						name={"status"}
						render={({field, fieldState: {error}}) => {
							const fieldValue = field.value.value !== "" ? field.value : undefined;
							return <FormControl
								py={2}
								className={"prevent-select"}
								isInvalid={!!error}
								id={"status"}
								isRequired={true}
							>
								<FormLabel>Job Status</FormLabel>
								<Select
									placeholder={t("addPanels.statusPlaceholder")}
									menuPlacement={"auto"}
									onChange={field.onChange}
									options={statuses}
									value={fieldValue}
								/>
								<FormErrorMessage>{error && error.message}</FormErrorMessage>
							</FormControl>
						}}
					/>
					<TextareaControl
						name={'note'}
						textareaProps={{placeholder: t("addPanels.notePlaceholder")}}
						label={t("addPanels.Note")}
						m={2}
					/>
					<CustomSubmitButtonGroup resetMethod={myJobMethods.reset}/>
				</VStack>
			</CustomFormProvider>
		</TabPanel>
	)
}

export default AddMyJobTabPanel;