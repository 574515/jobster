import React from "react";

import StatusList from "./StatusList.tsx";
import StatusFilters from "./StatusFilters.tsx";
import TextSearch from "./TextSearch.tsx";

import {Accordion} from "@chakra-ui/react";
import {FiltersType} from "../../models/types.ts";
import {FilterProps} from "../../models/interfaces.ts";

const Filters: React.FC<FilterProps> = (
	{
		allMyJobs, checkedStatuses, setCheckedStatuses,
		setMyJobsFiltered, setFilterActive,
	}
) => {
	const listOfFilters: FiltersType[] = [
		{
			filterName: "Search",
			filterComponent: (
				<TextSearch
					allMyJobs={allMyJobs}
					setMyJobsFiltered={setMyJobsFiltered}
				/>
			),
		},
		{
			filterName: "Status",
			filterComponent: (
				<StatusList
					jobListings={allMyJobs}
					checkedStatuses={checkedStatuses}
					setCheckedStatuses={setCheckedStatuses}
				/>
			),
		},
	];

	return (
		<Accordion w={"100%"} p={0} onChange={(e: number) => setFilterActive(e)} allowToggle>
			<StatusFilters listOfFilters={listOfFilters}/>
		</Accordion>
	);
}

export default Filters;