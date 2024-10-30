import React, {useEffect} from "react";

import CustomJobCard from "./customComponents/CustomJobCard.tsx";

import {Box, Grid, VStack} from "@chakra-ui/react";
import {AllJobListingsResponseModel, AllPoolListingsResponseModel} from "../models/componentsTypes.ts";
import {MyJobsProps} from "../models/interfaces.ts";
import CustomPoolCard from "./customComponents/CustomPoolCard.tsx";

const MyJobs: React.FC<MyJobsProps> = (
	{
		userJobListings, userPoolListings, isLoading, isPool = false,
		setIsLoading, getAllJobListings, getAllPoolListings,
	}
) => {
	const [templateColumns, setTemplateColumns] = React.useState<string>("");

	useEffect(() => setTemplateColumns(`repeat(${isPool ? 5 : 4}, 1fr)`), [isPool]);

	return (
		<VStack minW={'75%'}>
			<Grid templateColumns={templateColumns} gap={5} w={"100%"}>
				{!isPool && (userJobListings && userJobListings.length > 0) && !isLoading &&
					userJobListings.map((listing: AllJobListingsResponseModel, index: number) =>
						<Box key={index}>
							<CustomJobCard
								userJob={listing}
								setIsLoading={setIsLoading}
								getAllListings={getAllJobListings}
							/>
						</Box>
					)}
				{isPool && (userPoolListings && userPoolListings.length > 0) && !isLoading &&
					userPoolListings.map((listing: AllPoolListingsResponseModel, index: number) =>
						<Box key={index}>
							<CustomPoolCard
								userJob={listing}
								setIsLoading={setIsLoading}
								getAllListings={getAllPoolListings}
							/>
						</Box>
					)}
			</Grid>
		</VStack>
	);
};

export default MyJobs;