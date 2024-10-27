import {FiltersType} from "../../models/componentsTypes.ts";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import React from "react";
import {StatusFiltersProps} from "../../models/interfaces.ts";

const StatusFilters: React.FC<StatusFiltersProps> = (
	{listOfFilters}
) => {
	return (listOfFilters.map((filter: FiltersType, index: number) => (
			<AccordionItem key={index}>
				<h2>
					<AccordionButton>
						<Box className={filter.className} as='span' flex='1' textAlign='center'>
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