import React from "react";

import {FiltersType} from "../../models/types.ts";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import {StatusFiltersProps} from "../../models/interfaces.ts";

const StatusFilters: React.FC<StatusFiltersProps> = ({listOfFilters}) => {
	return (listOfFilters.map((filter: FiltersType, index: number) => (
			<AccordionItem key={index} borderStyle={index === 0 ? "none" : "solid"}>
				<h2>
					<AccordionButton>
						<Box className={"prevent-select"} as='span' flex='1' textAlign='center'>
							{filter.filterName}
						</Box>
						<AccordionIcon/>
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4} justifyContent={"center"}>
					{filter.filterComponent}
				</AccordionPanel>
			</AccordionItem>
		))
	);
}

export default StatusFilters;