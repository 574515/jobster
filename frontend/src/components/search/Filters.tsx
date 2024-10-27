import React from "react";

import StatusList from "./StatusList.tsx";
import StatusFilters from "./StatusFilters.tsx";

import {Accordion} from "@chakra-ui/react";
import {FiltersType} from "../../models/componentsTypes.ts";
import {FilterProps} from "../../models/interfaces.ts";

const Filters: React.FC<FilterProps> = (
	{userJobListings, checkedStates, setCheckedStates}
) => {
	const listOfFilters: FiltersType[] = [
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
	]
	return (
		<Accordion allowMultiple w={"100%"} defaultIndex={[0]}>
			<StatusFilters
				listOfFilters={listOfFilters}
			/>
		</Accordion>
	);
}

export default Filters;