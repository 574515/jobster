import React, {BaseSyntheticEvent} from "react";

import {Input} from "@chakra-ui/react";
import {TextSearchProps} from "../../models/interfaces.ts";

const TextSearch: React.FC<TextSearchProps> = (
	{userJobListings, setSearchedListings}
) => {

	const handleSearch = (data: BaseSyntheticEvent) => {
		const formattedSearchTerm = data.target.value.toLowerCase().trim();
		setSearchedListings(userJobListings.filter(listing =>
			listing.jobTitle.toLowerCase().includes(formattedSearchTerm) ||
			listing.company.toLowerCase().includes(formattedSearchTerm) ||
			listing.description?.toLowerCase().includes(formattedSearchTerm)
		));
	};

	return (
		<Input
			placeholder="Search..."
			onKeyUp={handleSearch}
		/>
	);
}

export default TextSearch;