import React from "react";

import StatusList from "./StatusList.tsx";
import StatusFilters from "./StatusFilters.tsx";

import {Accordion} from "@chakra-ui/react";
import {FiltersType} from "../../models/componentsTypes.ts";
import {FilterProps} from "../../models/interfaces.ts";
import TextSearch from "./TextSearch.tsx";

const Filters: React.FC<FilterProps> = (
	{
		userJobListings, checkedStates, setCheckedStates,
		setSearchedListings, setFilterActive,
	}
) => {
	const listOfFilters: FiltersType[] = [
		{
			filterName: "Search",
			filterComponent: (
				<TextSearch
					userJobListings={userJobListings}
					setSearchedListings={setSearchedListings}
				/>
			),
			className: "prevent-select",
		},
		{
			filterName: "Status",
			filterComponent: (
				<StatusList
					jobListings={userJobListings}
					checkedStates={checkedStates}
					setCheckedStates={setCheckedStates}
				/>
			),
			className: "prevent-select",
		},
		{
			filterName: "Date Applied",
			filterComponent: null,
			className: "prevent-select",
		},
		{
			filterName: "Closing Date",
			filterComponent: null,
			className: "prevent-select",
		}
	];

	return (
		<Accordion w={"100%"} defaultIndex={0} onChange={(e: number) => setFilterActive(e)}>
			<StatusFilters
				listOfFilters={listOfFilters}
			/>
		</Accordion>
	);
}

export default Filters;