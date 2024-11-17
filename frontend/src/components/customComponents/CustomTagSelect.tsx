import React from "react";

import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/react";
import {CreatableSelect, GroupBase} from "chakra-react-select";
import {Controller} from "react-hook-form";
import {CustomSelectTagProps} from "../../models/interfaces.ts";
import {
	AddEditJobNameType,
	CategorySelectionGroupModel,
	CategorySelectionModel
} from "../../models/customComponentsTypes.ts";
import {FaCaretRight} from "react-icons/fa6";

import "../../styles/componentStyle.css";

const CustomTagSelect: React.FC<CustomSelectTagProps> = (
	{
		choices, control, name, py, className, label,
		isClearable = true, isRequired = false,
	}
) => {

	const formatGroupLabel = (data: GroupBase<CategorySelectionModel>) => (
		<span className={"customSelectGroupLabel"}><FaCaretRight/>&nbsp;{data.label}</span>
	);

	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setLoading(true);
		choices.map((category: CategorySelectionGroupModel) => {
			category.options.map((jobTitle: CategorySelectionModel) => {
				jobTitle.color = category.color;
			});
		});
		setLoading(false);
	}, [choices]);

	return (
		<Controller
			control={control}
			name={name as AddEditJobNameType}
			render={(
				{
					field: {onChange, onBlur, name, ref, value},
					fieldState: {error},
				}) => (
				<FormControl
					py={py ? py : 0}
					className={className}
					isInvalid={!!error}
					id={name}
					isRequired={isRequired}
				>
					{label && <FormLabel>{label}</FormLabel>}
					<CreatableSelect
						isLoading={loading}
						isDisabled={loading}
						menuPlacement="auto"
						name={name}
						placeholder={"Select or Add Your Own Category"}
						ref={ref}
						onChange={(selectedOptions) => onChange(selectedOptions)}
						onBlur={onBlur}
						closeMenuOnSelect={false}
						options={choices}
						isClearable={isClearable}
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
	);

}

export default CustomTagSelect;