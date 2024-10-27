import React from "react";
import {Button, ButtonGroup, Flex, Heading, HStack, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {useForm} from "react-hook-form";
import {AddIcon} from "@chakra-ui/icons";
import {BiExit} from "react-icons/bi";

import userAtom from "../atoms/userAtom.ts";
import AddEditJobModal from "../components/AddEditJobModal.tsx";
import {JobActions} from "../components/JobActions.action.ts";
import {AllJobsResponseModel} from "../models/componentsTypes.ts";
import LoadingOverlay from "../components/LoadingOverlay.tsx";
import MyJobs from "../components/MyJobs.tsx";
import {NewJobValidationSchema} from "../helpers/validators.ts";
import {defaultNewJobValues} from "../helpers/constants.ts";
import Filters from "../components/search/Filters.tsx";
import {AuthContextType} from "../models/contextTypes.ts";
import AuthContext from "../context/AuthContext.tsx";

const Home = () => {
	const user = useRecoilValue(userAtom);
	const {onOpen, isOpen, onClose} = useDisclosure();

	const [userJobListings, setUserJobListings] = React.useState<AllJobsResponseModel[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [checkedStates, setCheckedStates] = React.useState<Record<string, boolean>>({});
	const [totalNumberOfListings, setTotalNumberOfListings] = React.useState<number>(0);
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const logoutUser = authContext ? authContext.logoutUser : undefined;

	const getAllListings = React.useCallback(() => {
		if (user) {
			setIsLoading(true);
			JobActions.getAllJobs(user._id)
				.then((data: AllJobsResponseModel[]) => {
					setUserJobListings(data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setIsLoading(false));
		}
	}, [user]);

	React.useEffect(() => {
		getAllListings();
	}, [getAllListings]);

	const filteredJobListings = React.useMemo(() => {
		const filteredJobs: AllJobsResponseModel[] = userJobListings.filter((job) => checkedStates[job.status.value]);
		setTotalNumberOfListings(userJobListings.length);
		return filteredJobs;
	}, [userJobListings, checkedStates]);

	const methods = useForm({
		resolver: NewJobValidationSchema,
		defaultValues: defaultNewJobValues,
		mode: "onChange",
	});

	const handleLogout = async () => {
		setIsLoading(true);
		if (logoutUser) {
			await logoutUser()
				.catch((error) => console.log(error))
				.finally(() => setIsLoading(false));
		}
	}

	return (
		<React.Fragment>
			<LoadingOverlay isLoading={isLoading}/>
			<Flex justifyContent="center">
				{user && (
					<React.Fragment>
						<VStack alignItems="start" w="100%">
							<HStack justifyContent="space-evenly" w="100%">
								<Heading my="1rem" size="md">
									My Jobs
								</Heading>
								<ButtonGroup>
									<Button leftIcon={<AddIcon/>} variant="outline" colorScheme="gray" onClick={onOpen}>
										Add Listing
									</Button>
									<Button leftIcon={<BiExit/>} variant="outline" colorScheme="gray"
									        onClick={handleLogout}>
										Logout
									</Button>
								</ButtonGroup>
							</HStack>

							<HStack alignItems="start" w="100%">
								<MyJobs
									setIsLoading={setIsLoading}
									getAllListings={getAllListings}
									isLoading={isLoading}
									userJobListings={filteredJobListings}
								/>
								<VStack p={3} justifyContent="center" gap={5} width="25%">
									<Text className={"prevent-select"} fontWeight={"bold"}>Filter By</Text>
									<Filters
										checkedStates={checkedStates}
										setCheckedStates={setCheckedStates}
										userJobListings={userJobListings}
									/>
									<span><b>Total:</b> {totalNumberOfListings} job{totalNumberOfListings !== 1 && 's'}</span>
								</VStack>
							</HStack>
						</VStack>
					</React.Fragment>
				)}
			</Flex>

			{user && <AddEditJobModal
                isOpen={isOpen}
                onClose={onClose}
                user={user}
                getAllListings={getAllListings}
                methods={methods}
            />}
		</React.Fragment>
	);
};

export default Home;
