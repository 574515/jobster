import React from "react";

import SortBy from "./SortBy.tsx";
import Filters from "./Filters.tsx";

import {Text, VStack} from "@chakra-ui/react";
import {homeScreenPages} from "../../helpers/constants.ts";
import {CombinedFiltersProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import homeScreenAtom from "../../atoms/homeScreenAtom.ts";
import {WindowSizeType} from "../../models/types.ts";

const CombinedFilters: React.FC<CombinedFiltersProps> = (
	{
		allMyJobs,
		setAllMyJobs,
		allMyConnections,
		setAllMyConnections,
		userToApplyListings,
		setUserToApplyListings,
		checkedStatuses,
		setCheckedStatuses,
		setMyJobsFiltered,
		setFilterActive,
		totalNumberOfListings,
	}
) => {
	const [isPhone, setIsPhone] = React.useState<boolean>(false);
	const [windowSize, setWindowSize] = React.useState<WindowSizeType>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	React.useEffect(() => {
		const handleResize = () => setWindowSize({width: window.innerWidth, height: window.innerHeight});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	React.useEffect(() => setIsPhone(windowSize.width < 400), [windowSize.width]);

	const homeScreenState = useRecoilValue<string>(homeScreenAtom);

	return (
		<VStack w={"100%"} alignItems={"center"} px={4} gap={2}>
			{!isPhone && <Text className={"prevent-select"} fontWeight={"bold"}>Sort By</Text>}
			<SortBy
				isPhone={isPhone}
				allMyJobs={allMyJobs}
				setAllMyJobs={setAllMyJobs}
				allMyConnections={allMyConnections}
				setAllMyConnections={setAllMyConnections}
				allMyFutureApplications={userToApplyListings}
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
					<span><b>Total:</b> {totalNumberOfListings} job{totalNumberOfListings !== 1 && 's'}</span>
				</VStack>
			)}
		</VStack>
	);
}

export default CombinedFilters;