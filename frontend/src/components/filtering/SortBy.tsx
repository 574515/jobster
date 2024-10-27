import React from "react";
import {SortByProps} from "../../models/interfaces.ts";
import {FormControl, Select} from "@chakra-ui/react";
import {sortByOptions} from "../../helpers/constants.ts";
import {SortByOptionType} from "../../models/componentsTypes.ts";

const SortBy: React.FC<SortByProps> = (
	{userJobListings, setUserJobListings}
) => {

	const handleSort = (e: React.BaseSyntheticEvent) => {
		const sortingValue: string = e.target.value;
		let sortBy, order;

		if (sortingValue.includes("Date Applied")) {
			sortBy = 'dateApplied';
			order = sortingValue.includes("Newest") ? 'newest' : 'oldest';
		} else {
			sortBy = 'closingDate';
			order = sortingValue.includes("Later") ? 'later' : 'sooner';
		}
		setUserJobListings([...userJobListings].sort((a, b) => {
			const dateA: number = new Date(a[sortBy]).getTime();
			const dateB: number = new Date(b[sortBy]).getTime();
			if (order === 'newest' || order === 'later') {
				return dateB - dateA;
			} else {
				return dateA - dateB;
			}
		}));
	};


	return (
		<FormControl w={"100%"}>
			<Select
				onChange={handleSort}
			>
				{sortByOptions.map((option: SortByOptionType, index: number) => {
					const combinedOption = `${option.whatDate} [${option.when}]`;
					return (
						<option
							defaultValue={index === 0 ? combinedOption : undefined}
							key={index}
						>
							{combinedOption}
						</option>
					);
				})}
			</Select>
		</FormControl>
	);
}

export default SortBy;