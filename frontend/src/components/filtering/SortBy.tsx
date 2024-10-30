import React from "react";
import {SortByProps} from "../../models/interfaces.ts";
import {FormControl, Select} from "@chakra-ui/react";
import {sortByJobOptions, sortByPoolOptions} from "../../helpers/constants.ts";
import {AllPoolListingsResponseModel, SortByOptionType} from "../../models/componentsTypes.ts";

const SortBy: React.FC<SortByProps> = (
	{
		isPool = false, userJobListings, setUserJobListings,
		userPoolListings, setUserPoolListings
	}
) => {
	const [sortOptions, setSortOptions] = React.useState<SortByOptionType[]>([]);

	React.useEffect(() => setSortOptions(isPool ? sortByPoolOptions : sortByJobOptions), [isPool]);

	const handleSort = (e: React.BaseSyntheticEvent) => {
		if (!isPool) {
			if (userJobListings && setUserJobListings) {
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
			}
		} else {
			if (userPoolListings && setUserPoolListings) {
				const sortingValue: string = e.target.value;
				const order = sortingValue.includes("Newest") ? 'newest' : 'oldest';
				setUserPoolListings([...userPoolListings].sort((a: AllPoolListingsResponseModel, b: AllPoolListingsResponseModel) => {
					const dateA: number = new Date(a["dateSent"]).getTime();
					const dateB: number = new Date(b["dateSent"]).getTime();
					return order === 'newest' ? dateB - dateA : dateA - dateB;
				}));
			}
		}
	};


	return (
		<FormControl w={"100%"}>
			<Select
				onChange={handleSort}
				textAlign={"center"}
			>
				{sortOptions.map((option: SortByOptionType, index: number) => {
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