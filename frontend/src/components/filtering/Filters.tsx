import React from "react";

import StatusList from "./StatusList.tsx";
import StatusFilters from "./StatusFilters.tsx";
import TextSearch from "./TextSearch.tsx";

import {Accordion} from "@chakra-ui/react";
import {FiltersType} from "../../models/types.ts";
import {FilterProps} from "../../models/interfaces.ts";
import {useTranslation} from "react-i18next";

const Filters: React.FC<FilterProps> = (
	{
		allMyJobs, checkedStatuses, setCheckedStatuses,
		setMyJobsFiltered, setFilterActive,
	}
) => {
	const {t} = useTranslation();
	const listOfFilters: FiltersType[] = [
		{
			filterName: t("filters.Search"),
			filterComponent: (
				<TextSearch
					allMyJobs={allMyJobs}
					setMyJobsFiltered={setMyJobsFiltered}
				/>
			),
		},
		{
			filterName: t("filters.Status"),
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