import {FormControl, FormLabel} from "@chakra-ui/react";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {TIME_FORMATS} from "../../helpers/dateLocales.ts";
import {Controller} from "react-hook-form";
import {useRecoilValue} from "recoil";
import userLocaleAtom from "../../atoms/userLocaleAtom.ts";
import React from "react";
import {CustomDateSelectProps} from "../../models/interfaces.ts";
import {AddEditJobNameType, AddEditPoolNameType, CustomDateSelectPropsType} from "../../models/componentsTypes.ts";

const CustomDateSelect: React.FC<CustomDateSelectProps> = (
	{jobControl, poolControl, name, py, className, label, definedDate, setDate, percentWidth}
) => {
	const userLocale = useRecoilValue(userLocaleAtom)
	const [propsConfigs, setPropsConfigs] = React.useState<CustomDateSelectPropsType>({
		triggerBtnProps: {
			width: "50%",
		}
	});

	React.useEffect(() => {
		if (percentWidth) {
			const transformedPercentWidth = `${percentWidth}%`;
			setPropsConfigs({
				triggerBtnProps: {
					width: transformedPercentWidth,
				}
			});
		}
	}, [percentWidth]);

	return (
		jobControl ? (
			<Controller
				control={jobControl}
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
							propsConfigs={propsConfigs}
						/>
					</FormControl>
				)}
			/>
		) : (
			<Controller
				control={poolControl}
				name={name as AddEditPoolNameType}
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
							propsConfigs={propsConfigs}
						/>
					</FormControl>
				)}
			/>
		));
}

export default CustomDateSelect;