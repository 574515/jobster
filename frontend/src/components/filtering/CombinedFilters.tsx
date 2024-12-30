import {FC} from "react";

import SortBy from "./SortBy.tsx";
import Filters from "./Filters.tsx";
import homeScreenAtom from "../../atoms/homeScreenAtom.ts";
import isPhoneAtom from "../../atoms/isPhoneAtom.ts";

import {Text, VStack} from "@chakra-ui/react";
import {homeScreenPages} from "../../helpers/constants.ts";
import {CombinedFiltersProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import {useTranslation} from "react-i18next";

const CombinedFilters: FC<CombinedFiltersProps> = (
	{
		allMyJobs, setAllMyJobs, allMyConnections, setAllMyConnections,
		allMyFutureConnections, setUserToApplyListings, checkedStatuses, setCheckedStatuses,
		setMyJobsFiltered, setFilterActive, totalNumberOfListings,
	}
) => {
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);
	const isPhone = useRecoilValue<boolean>(isPhoneAtom);
	const {t} = useTranslation();

	return (
		<VStack w={"100%"} alignItems={"center"} px={4} gap={2}>
			{!isPhone && <Text className={"prevent-select"} fontWeight={"bold"}>{t("filters.SortBy")}</Text>}
			<SortBy
				allMyJobs={allMyJobs}
				setAllMyJobs={setAllMyJobs}
				allMyConnections={allMyConnections}
				setAllMyConnections={setAllMyConnections}
				allMyFutureApplications={allMyFutureConnections}
				setAllMyFutureApplications={setUserToApplyListings}
			/>
			{homeScreenState === homeScreenPages.MY_JOBS && allMyJobs && (
				<VStack w={"100%"} px={3} justifyContent="center" gap={5}>
					<Filters
						checkedStatuses={checkedStatuses}
						setCheckedStatuses={setCheckedStatuses}
						allMyJobs={allMyJobs}
						setMyJobsFiltered={setMyJobsFiltered}
						setFilterActive={setFilterActive}
					/>
					<span><b>{t("filters.TotalJobs")}:</b> {totalNumberOfListings}</span>
				</VStack>
			)}
		</VStack>
	);
}

export default CombinedFilters;