import React from "react";

import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import {Select} from "chakra-react-select";
import {Controller} from "react-hook-form";
import {CustomSelectSelectProps} from "../../models/interfaces.ts";
import {AddEditJobNameType} from "../../models/componentsTypes.ts";

const CustomSelect: React.FC<CustomSelectSelectProps> = (
	{
		choices, control, name, py, className,
		label, definedValue, placeholder,
		isClearable = true, isRequired = false,
	}
) => {
	return (
		<Controller
			control={control}
			name={name as AddEditJobNameType}
			render={({
				         field: {
					         onChange,
					         onBlur,
					         name,
					         ref,
				         },
				         fieldState: {error}
			         }) => (
				<FormControl
					py={py ? py : 0}
					className={className}
					isInvalid={!!error}
					id={name}
					isRequired={isRequired}
				>
					{label && <FormLabel>{label}</FormLabel>}
					<Select
						placeholder={placeholder}
						menuPlacement={"auto"}
						name={name}
						ref={ref}
						onChange={onChange}
						onBlur={onBlur}
						options={choices}
						value={definedValue}
						isClearable={isClearable}
					/>
					<FormErrorMessage>{error && error.message}</FormErrorMessage>
				</FormControl>
			)}
		/>
	);
}

export default CustomSelect;