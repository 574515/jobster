import React from "react";
import {Button, ButtonGroup, Flex, Heading, HStack, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {useRecoilValue, useSetRecoilState} from "recoil";
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
import Filters from "../components/filtering/Filters.tsx";
import {AuthContextType} from "../models/contextTypes.ts";
import AuthContext from "../context/AuthContext.tsx";
import SortBy from "../components/filtering/SortBy.tsx";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import Pool from "../components/Pool.tsx";

const Home = () => {
	const user = useRecoilValue(userAtom);
	const {onOpen, isOpen, onClose} = useDisclosure();

	const [userJobListings, setUserJobListings] = React.useState<AllJobsResponseModel[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [checkedStates, setCheckedStates] = React.useState<Record<string, boolean>>({});
	const [totalNumberOfListings, setTotalNumberOfListings] = React.useState<number>(0);
	const [searchedListings, setSearchedListings] = React.useState<AllJobsResponseModel[]>([]);
	const [filterActive, setFilterActive] = React.useState<number>(0);
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const logoutUser = authContext ? authContext.logoutUser : undefined;
	const homeScreenState = useRecoilValue(homeScreenAtom);
	const setHomeScreenState = useSetRecoilState(homeScreenAtom);
	const homeScreenPages = [
		{
			title: "My Jobs",
			active: true,
			value: "myJobs",
		},
		{
			title: "Pool",
			active: false,
			value: "pool",
		}
	];

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

	React.useEffect(() => getAllListings(), [getAllListings]);

	React.useEffect(() => setSearchedListings(userJobListings), [userJobListings]);

	const filteredJobListings = React.useMemo(() => {
		if (filterActive === 1) {
			setTotalNumberOfListings(userJobListings.length);
			return userJobListings.filter((job) => checkedStates[job.status.value]);
		}
		if (filterActive === 0) {
			setTotalNumberOfListings(searchedListings.length);
			return searchedListings;
		}
		return userJobListings;
	}, [checkedStates, filterActive, searchedListings, userJobListings]);

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

	const handlePageClick = (pageValue: string) => {
		// Set the clicked page as active in Recoil state
		setHomeScreenState(pageValue);
	};


	return (
		<React.Fragment>
			<LoadingOverlay isLoading={isLoading}/>
			<Flex justifyContent="center">
				{user && (
					<React.Fragment>
						<VStack alignItems="start" w="100%">
							<HStack justifyContent="space-evenly" w="100%">
								{homeScreenPages.map((page, index) => (
									<Heading
										my="1rem"
										size="md"
										key={index}
										onClick={() => handlePageClick(page.value)}
										color={homeScreenState === page.value ? "blue.500" : "gray.500"}
										className={"make-pointer"}
										px={8}
										py={2}
										border={"1px solid red"}
									>
										{page.title}
									</Heading>
								))}
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
								{homeScreenState === "myJobs" && (
									<MyJobs
										setIsLoading={setIsLoading}
										getAllListings={getAllListings}
										isLoading={isLoading}
										userJobListings={filteredJobListings}
									/>
								)}
								{homeScreenState === "pool" && (
									<Pool/>
								)}
								<VStack w={"100%"}>
									<VStack w={"100%"} p={3} justifyContent="center" gap={5}>
										<Text className={"prevent-select"} fontWeight={"bold"}>Sort By</Text>
										<SortBy
											userJobListings={userJobListings}
											setUserJobListings={setUserJobListings}
										/>
									</VStack>
									<VStack w={"100%"} p={3} justifyContent="center" gap={5}>
										<Filters
											checkedStates={checkedStates}
											setCheckedStates={setCheckedStates}
											userJobListings={userJobListings}
											setSearchedListings={setSearchedListings}
											setFilterActive={setFilterActive}
										/>
										<span><b>Total:</b> {totalNumberOfListings} job{totalNumberOfListings !== 1 && 's'}</span>
									</VStack>
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
