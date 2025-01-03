import {BaseSyntheticEvent, FC, LegacyRef, useRef} from "react";

import {Input} from "@chakra-ui/react";
import {TextSearchProps} from "../../models/interfaces.ts";
import {useTranslation} from "react-i18next";

const TextSearch: FC<TextSearchProps> = ({allMyJobs, setMyJobsFiltered}) => {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const {t} = useTranslation();

	const handleSearch = (data: BaseSyntheticEvent) => {
		const formattedSearchTerm = data.target.value.toLowerCase().trim();
		setMyJobsFiltered(allMyJobs.filter(listing =>
			listing.jobTitle.toLowerCase().includes(formattedSearchTerm) ||
			listing.company.toLowerCase().includes(formattedSearchTerm) ||
			listing.description?.toLowerCase().includes(formattedSearchTerm)
		));
	};

	return (
		<Input
			placeholder={t("filters.searchPlaceholder")}
			textAlign={"center"}
			ref={searchInputRef as LegacyRef<HTMLInputElement>}
			onFocus={() => {
				if (searchInputRef.current) {
					searchInputRef.current.style.textAlign = "start";
					searchInputRef.current.placeholder = "";
				}
			}}
			onBlur={() => {
				if (searchInputRef.current && !searchInputRef.current.value) {
					searchInputRef.current.style.textAlign = "center";
					searchInputRef.current.placeholder = t("filters.searchPlaceholder");
				}
			}}
			onKeyUp={handleSearch}
		/>
	);
}

export default TextSearch;