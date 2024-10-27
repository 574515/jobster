import React from "react";

import CustomJobCard from "./customComponents/CustomJobCard.tsx";

import {Box, Divider, Grid, VStack} from "@chakra-ui/react";
import {AllJobsResponseModel} from "../models/componentsTypes.ts";
import {MyJobsProps} from "../models/interfaces.ts";

const MyJobs: React.FC<MyJobsProps> = (
	{userJobListings, isLoading, setIsLoading, getAllListings}
) => {
	return (
		<VStack minW={'75%'}>
			<Divider/>
			<Grid templateColumns='repeat(3, 1fr)' gap={5} w={"100%"}>
				{(userJobListings.length > 0) && !isLoading && userJobListings
					.map((userJob: AllJobsResponseModel, index: number) =>
						<Box key={index}>
							<CustomJobCard
								userJob={userJob}
								setIsLoading={setIsLoading}
								getAllListings={getAllListings}
							/>
						</Box>
					)}
			</Grid>
		</VStack>
	);
};

export default MyJobs;