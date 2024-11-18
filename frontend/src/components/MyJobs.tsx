import React from "react";

import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import loadingAtom from "../atoms/loadingAtom.ts";
import CustomFutureApplicationCard from "./customComponents/CustomFutureApplicationCard.tsx";
import CustomJobCard from "./customComponents/CustomJobCard.tsx";
import CustomConnectionCard from "./customComponents/CustomConnectionCard.tsx";

import {Box, Grid, VStack} from "@chakra-ui/react";
import {MyJobsProps} from "../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import {homeScreenPages} from "../helpers/constants.ts";
import {MyConnectionResponseModel, MyFutureApplicationResponseModel, MyJobResponseModel} from "../models/types.ts";

const MyJobs: React.FC<MyJobsProps> = (
	{
		allMyJobs, allMyConnections,
		getAllMyJobs, getAllMyConnections,
		allMyFutureApplications, getAllMyFutureApplications
	}
) => {
	const [templateColumns, setTemplateColumns] = React.useState<string>("");
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);
	const isLoading = useRecoilValue<boolean>(loadingAtom);

	React.useEffect(() => {
		if (homeScreenState === homeScreenPages.MY_JOBS) setTemplateColumns('repeat(4, 1fr)');
		else setTemplateColumns('repeat(5, 1fr)');
	}, [homeScreenState]);

	return (
		<VStack minW={'75%'}>
			<Grid templateColumns={templateColumns} gap={5} w={"100%"}>
				{homeScreenState === homeScreenPages.MY_JOBS && (allMyJobs && allMyJobs.length > 0) && !isLoading &&
					allMyJobs.map((listing: MyJobResponseModel, index: number) => (
						<Box key={index}>
							<CustomJobCard
								item={listing}
								getAllItems={getAllMyJobs}
							/>
						</Box>
					))}
				{homeScreenState === homeScreenPages.MY_CONNECTIONS && (allMyConnections && allMyConnections.length > 0) && !isLoading &&
					allMyConnections.map((listing: MyConnectionResponseModel, index: number) => (
						<Box key={index}>
							<CustomConnectionCard
								item={listing}
								getAllItems={getAllMyConnections}
							/>
						</Box>
					))}
				{homeScreenState === homeScreenPages.MY_FUTURE_APPLICATIONS && (allMyFutureApplications && allMyFutureApplications.length > 0) && !isLoading &&
					allMyFutureApplications.map((listing: MyFutureApplicationResponseModel, index: number) => (
						<Box key={index}>
							<CustomFutureApplicationCard
								item={listing}
								getAllItems={getAllMyFutureApplications}
							/>
						</Box>
					))}
			</Grid>
		</VStack>
	);
};

export default MyJobs;