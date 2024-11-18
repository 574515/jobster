import React from "react";

import userLocaleAtom from "../../atoms/userLocaleAtom.ts";

import {Checkbox, FormControl, FormLabel, HStack} from "@chakra-ui/react";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {Controller} from "react-hook-form";
import {useRecoilValue} from "recoil";
import {CustomDateSelectProps} from "../../models/interfaces.ts";
import {AddEditJobNameType} from "../../models/customComponentsTypes.ts";

const CustomDateSelect: React.FC<CustomDateSelectProps> = (
	{
		control, name, py, className, label, definedDate,
		setDate, minDate, hasClosingDate, setHasClosingDate,
		isRequired = false, hasCheckbox = false,
	}
) => {
	const userLocale = useRecoilValue<string>(userLocaleAtom);

	return (
		<Controller
			control={control}
			name={name as AddEditJobNameType}
			render={({field}) => {
				return <FormControl
					py={py ?? 0}
					className={className}
					textAlign={"center"}
					isRequired={isRequired}
				>
					{label && <FormLabel mx={0}>{label}</FormLabel>}
					<HStack>
						<SingleDatepicker
							date={definedDate}
							onDateChange={(date) => {
								field.onChange(date);
								setDate(date);
							}}
							configs={{dateFormat: TIME_FORMATS[userLocale],}}
							propsConfigs={{
								triggerBtnProps: {
									width: "100%",
								}
							}}
							minDate={minDate}
							maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
							disabled={hasCheckbox ? !hasClosingDate : false}
						/>
						{hasCheckbox && (
							<Checkbox
								onChange={() => {
									if (setHasClosingDate)
										setHasClosingDate(!hasClosingDate);
								}}
							/>
						)}
					</HStack>
				</FormControl>
			}}
		/>
	);
}

export default CustomDateSelect;