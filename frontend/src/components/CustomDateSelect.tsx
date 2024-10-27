import {FormControl, FormLabel} from "@chakra-ui/react";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../helpers/dateLocales.ts";
import {Controller} from "react-hook-form";
import {useRecoilValue} from "recoil";
import userLocaleAtom from "../atoms/userLocaleAtom.ts";
import React from "react";
import {CustomDateSelectProps} from "../models/interfaces.ts";
import {AddEditJobNameType} from "../models/componentsTypes.ts";

const CustomDateSelect: React.FC<CustomDateSelectProps> = (
	{control, name, py, className, label, definedDate, setDate}
) => {
	const userLocale = useRecoilValue(userLocaleAtom);
	return (
		<Controller
			control={control}
			name={name as AddEditJobNameType}
			render={({field}) => (
				<FormControl
					py={py ?? 0}
					className={className}
					textAlign={"center"}
				>
					{label && <FormLabel mx={0} textAlign={"center"}>{label}</FormLabel>}
					<SingleDatepicker
						date={(field.value as Date) ?? definedDate}
						onDateChange={(date) => {
							field.onChange(date);
							setDate(date);
						}}
						configs={{dateFormat: TIME_FORMATS[userLocale],}}
					/>
				</FormControl>
			)}
		/>
	);
}

export default CustomDateSelect;