import React from "react";

import {Input} from "@chakra-ui/react";
import {TextSearchProps} from "../../models/interfaces.ts";

const TextSearch: React.FC<TextSearchProps> = ({allMyJobs, setMyJobsFiltered}) => {
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	const handleSearch = (data: React.BaseSyntheticEvent) => {
		const formattedSearchTerm = data.target.value.toLowerCase().trim();
		setMyJobsFiltered(allMyJobs.filter(listing =>
			listing.jobTitle.toLowerCase().includes(formattedSearchTerm) ||
			listing.company.toLowerCase().includes(formattedSearchTerm) ||
			listing.description?.toLowerCase().includes(formattedSearchTerm)
		));
	};

	return (
		<Input
			placeholder={"Title, Company or Description"}
			textAlign={"center"}
			ref={searchInputRef as React.LegacyRef<HTMLInputElement>}
			onFocus={() => {
				if (searchInputRef.current) {
					searchInputRef.current.style.textAlign = "start";
					searchInputRef.current.placeholder = "";
				}
			}}
			onBlur={() => {
				if (searchInputRef.current && !searchInputRef.current.value) {
					searchInputRef.current.style.textAlign = "center";
					searchInputRef.current.placeholder = "Title, Company or Description";
				}
			}}
			onKeyUp={handleSearch}
		/>
	);
}

export default TextSearch;