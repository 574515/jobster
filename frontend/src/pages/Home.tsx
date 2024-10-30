import React from "react";
import {
	Button,
	ButtonGroup,
	Divider,
	Flex,
	Heading,
	HStack,
	Text,
	Tooltip,
	useDisclosure,
	VStack
} from "@chakra-ui/react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useForm} from "react-hook-form";
import {AddIcon} from "@chakra-ui/icons";
import {BiExit} from "react-icons/bi";

import userAtom from "../atoms/userAtom.ts";
import AddListingModal from "../components/AddListingModal.tsx";
import {JobActions, PoolActions} from "../components/AppActions.action.ts";
import {
	AllJobListingsResponseModel,
	AllPoolListingsResponseModel,
	HomeScreenPagesType
} from "../models/componentsTypes.ts";
import LoadingOverlay from "../components/LoadingOverlay.tsx";
import MyJobs from "../components/MyJobs.tsx";
import {defaultNewJobValues, defaultNewPoolValues} from "../helpers/constants.ts";
import Filters from "../components/filtering/Filters.tsx";
import {AuthContextType} from "../models/contextTypes.ts";
import AuthContext from "../context/AuthContext.tsx";
import SortBy from "../components/filtering/SortBy.tsx";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import {NewConnectionValidationSchema, NewJobValidationSchema} from "../helpers/validators.ts";

const Home = () => {
	const user = useRecoilValue(userAtom);
	const {onOpen, isOpen, onClose} = useDisclosure();

	const [userJobListings, setUserJobListings] = React.useState<AllJobListingsResponseModel[]>([]);
	const [userPoolListings, setUserPoolListings] = React.useState<AllPoolListingsResponseModel[]>([]);
	const [userToApplyListings, setUserToApplyListings] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [checkedStates, setCheckedStates] = React.useState<Record<string, boolean>>({});
	const [totalNumberOfListings, setTotalNumberOfListings] = React.useState<number>(0);
	const [searchedListings, setSearchedListings] = React.useState<AllJobListingsResponseModel[]>([]);
	const [filterActive, setFilterActive] = React.useState<number>(0);
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const logoutUser = authContext ? authContext.logoutUser : undefined;
	const homeScreenState = useRecoilValue(homeScreenAtom);
	const setHomeScreenState = useSetRecoilState(homeScreenAtom);
	const homeScreenPages: HomeScreenPagesType[] = [
		{
			title: "My Jobs",
			value: "myJobs",
		},
		{
			title: "My Connections",
			value: "pool", // TODO: refactor
		},
		{
			title: "My Future Applications",
			value: "toApply", // TODO: refactor
		}
	];

	const getAllJobListings = React.useCallback(() => {
		if (user) {
			setIsLoading(true);
			JobActions
				.getAllJobListings(user._id)
				.then((data: AllJobListingsResponseModel[]) => setUserJobListings(data))
				.catch((err) => console.log(err))
				.finally(() => setIsLoading(false));
		}
	}, [user]);

	const getAllPoolListings = React.useCallback(() => {
		if (user) {
			setIsLoading(true);
			PoolActions
				.getAllPoolListings(user._id)
				.then((data: AllPoolListingsResponseModel[]) => setUserPoolListings(data))
				.catch((err) => console.log(err))
				.finally(() => setIsLoading(false));
		}
	}, [user]);

	React.useEffect(() => {
		switch (homeScreenState) {
			case "myJobs": {
				getAllJobListings();
				break;
			}
			case "pool": {
				getAllPoolListings();
				break;
			}
			case "toApply": {
				break;
			}
			default: {
				getAllJobListings();
				break;
			}
		}
	}, [getAllJobListings, getAllPoolListings, homeScreenState]);

	React.useEffect(() => getAllPoolListings(), [getAllPoolListings]);

	React.useEffect(() => setSearchedListings(userJobListings), [userJobListings]);

	React.useEffect(() => setHomeScreenState(userJobListings.length === 0 ? "pool" : "myJobs"), [setHomeScreenState, userJobListings.length]);

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

	const jobMethods = useForm({
		resolver: NewJobValidationSchema,
		defaultValues: defaultNewJobValues,
		mode: "onChange",
	});

	const poolMethods = useForm({
		resolver: NewConnectionValidationSchema,
		defaultValues: defaultNewPoolValues,
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
		if (pageValue === "myJobs" && userJobListings.length === 0) return;
		if (pageValue === "pool" && userPoolListings.length === 0) return;
		if (pageValue === "toApply" && userToApplyListings.length === 0) return;
		setHomeScreenState(pageValue);
	}

	const isListingEmpty = (
		page: HomeScreenPagesType
	): boolean => {
		return (page.value === "pool" && userPoolListings.length === 0) ||
			(page.value === "myJobs" && userJobListings.length === 0);
	};

	const isActivePage = (
		page: HomeScreenPagesType
	): boolean => homeScreenState === page.value;

	const getClassName = (
		page: HomeScreenPagesType
	): string => {
		const baseClass = 'prevent-select';
		return isListingEmpty(page) ? baseClass : `${baseClass} make-pointer`;
	};

	const getHeading = (
		page: HomeScreenPagesType
	): React.ReactNode => {
		const content = <Text>{page.title}</Text>;
		return isListingEmpty(page)
			? <Tooltip hasArrow label={"It is empty."}>{content}</Tooltip>
			: content;
	};

	const getBottomBorder = (
		page: HomeScreenPagesType
	): string | undefined => {
		return !isListingEmpty(page) && isActivePage(page) ? "1px solid #fff" : undefined;
	};

	const getColor = (
		page: HomeScreenPagesType
	): string => {
		return isListingEmpty(page) ? "#999" : isActivePage(page) ? "#fff" : "#999";
	};

	return (
		<React.Fragment>
			<LoadingOverlay isLoading={isLoading}/>
			<Flex justifyContent="center">
				{user && (
					<React.Fragment>
						<VStack alignItems="start" w="100%">
							<HStack w="100%">
								<HStack justifyContent="space-evenly" w="100%">
									{homeScreenPages.map((page: HomeScreenPagesType, index: number): React.ReactNode => (
										<Heading
											my="1rem"
											size="md"
											key={index}
											onClick={() => handlePageClick(page.value)}
											className={getClassName(page)}
											px={4}
											py={2}
											borderBottom={getBottomBorder(page)}
											color={getColor(page)}
										>
											{getHeading(page)}
										</Heading>
									))}
								</HStack>
								<ButtonGroup>
									<Button leftIcon={<AddIcon/>} variant="outline" colorScheme="gray" onClick={onOpen}>
										Add
									</Button>
									<Button leftIcon={<BiExit/>} variant="outline" colorScheme="gray"
									        onClick={handleLogout}>
										Logout [{user.username}]
									</Button>
								</ButtonGroup>
							</HStack>
							<Divider/>
							<HStack alignItems="start" w="100%">
								{homeScreenState === "myJobs" && (
									<MyJobs
										setIsLoading={setIsLoading}
										isLoading={isLoading}
										userJobListings={filteredJobListings}
										getAllJobListings={getAllJobListings}
										userPoolListings={userPoolListings}
										getAllPoolListings={getAllPoolListings}
									/>
								)}
								{homeScreenState === "pool" && (
									<MyJobs
										setIsLoading={setIsLoading}
										isLoading={isLoading}
										userJobListings={filteredJobListings}
										getAllJobListings={getAllJobListings}
										userPoolListings={userPoolListings}
										getAllPoolListings={getAllPoolListings}
										isPool={true}
									/>
								)}
								<VStack w={"100%"}>
									<VStack w={"100%"} p={3} justifyContent="center" gap={5}>
										<Text className={"prevent-select"} fontWeight={"bold"}>Sort By</Text>
										<SortBy
											userJobListings={userJobListings}
											setUserJobListings={setUserJobListings}
											isPool={homeScreenState === "pool"}
											userPoolListings={userPoolListings}
											setUserPoolListings={setUserPoolListings}
										/>
									</VStack>
									{homeScreenState === "myJobs" && (
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
									)}
								</VStack>
							</HStack>
						</VStack>
					</React.Fragment>
				)}
			</Flex>

			{user && <AddListingModal
                isOpen={isOpen}
                onClose={onClose}
                user={user}
                getAllJobListings={getAllJobListings}
                getAllPoolListings={getAllPoolListings}
                jobMethods={jobMethods}
                poolMethods={poolMethods}
            />}
		</React.Fragment>
	);
};

export default Home;
