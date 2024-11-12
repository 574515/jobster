import React from "react";

import AuthContext from "../context/AuthContext.tsx";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import loadingAtom from "../atoms/loadingAtom.ts";
import userAtom from "../atoms/userAtom.ts";
import AddListingModal from "../components/AddListingModal.tsx";
import Filters from "../components/filtering/Filters.tsx";
import LoadingOverlay from "../components/LoadingOverlay.tsx";
import MyJobs from "../components/MyJobs.tsx";
import SortBy from "../components/filtering/SortBy.tsx";

import {
	Badge,
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
import {useRecoilState, useRecoilValue} from "recoil";
import {useForm} from "react-hook-form";
import {ConnectionActions, JobActions, ToApplyActions} from "../components/AppActions.action.ts";
import {HomeScreenPagesType} from "../models/componentsTypes.ts";
import {
	defaultMyConnectionValues,
	defaultMyFutureApplicationValues,
	defaultMyJobValues,
	homeScreenPages,
	homeScreenPagesList
} from "../helpers/constants.ts";
import {AuthContextType, CustomUser} from "../models/contextTypes.ts";
import {MyConnectionValidationSchema, MyJobValidationSchema, MyToApplyValidationSchema} from "../helpers/validators.ts";
import {ConstantItemNames} from "../helpers/enums.ts";
import {MyConnectionResponseModel, MyFutureApplicationResponseModel, MyJobResponseModel} from "../models/types.ts";
import {toast} from "../helpers/customToast.ts";
import {FaArrowRightFromBracket, FaPlus} from "react-icons/fa6";

const Home = () => {
	const {onOpen, isOpen, onClose} = useDisclosure();
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const logoutUser = authContext ? authContext.logoutUser : undefined;
	const user = useRecoilValue<CustomUser | null>(userAtom);
	const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingAtom);
	const [homeScreenState, setHomeScreenState] = useRecoilState<string>(homeScreenAtom);

	const [allMyJobs, setAllMyJobs] = React.useState<MyJobResponseModel[]>([]);
	const [myJobsFiltered, setMyJobsFiltered] = React.useState<MyJobResponseModel[]>([]);
	const [allMyConnections, setAllMyConnections] = React.useState<MyConnectionResponseModel[]>([]);
	const [userToApplyListings, setUserToApplyListings] = React.useState<MyFutureApplicationResponseModel[]>([]);
	const [checkedStatuses, setCheckedStatuses] = React.useState<Record<string, boolean>>({});
	const [totalNumberOfListings, setTotalNumberOfListings] = React.useState<number>(0);
	const [filterActive, setFilterActive] = React.useState<number>(0);

	const getAllMyJobs = React.useCallback(() => {
		if (user) {
			setIsLoading(true);
			JobActions
				.getAllMyJobs(user._id)
				.then((data: MyJobResponseModel[]) => setAllMyJobs(data))
				.catch((err) => void toast(err.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	}, [setIsLoading, user]);

	const getAllMyConnections = React.useCallback(() => {
		if (user) {
			setIsLoading(true);
			ConnectionActions
				.getAllMyConnections(user._id)
				.then((data: MyConnectionResponseModel[]) => setAllMyConnections(data))
				.catch((err) => void toast(err.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	}, [setIsLoading, user]);

	const getAllMyFutureApplications = React.useCallback(() => {
		if (user) {
			setIsLoading(true);
			ToApplyActions
				.getAllMyFutureApplications(user._id)
				.then((data: MyFutureApplicationResponseModel[]) => setUserToApplyListings(data))
				.catch((err) => void toast(err.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	}, [setIsLoading, user]);

	React.useEffect(() => {
		getAllMyJobs();
		getAllMyConnections();
		getAllMyFutureApplications();
	}, [getAllMyConnections, getAllMyJobs, getAllMyFutureApplications]);

	React.useEffect(() => setMyJobsFiltered(allMyJobs), [allMyJobs]);

	const filteredMyJobs = React.useMemo(() => {
		if (filterActive === 1) {
			setTotalNumberOfListings(allMyJobs.length);
			return allMyJobs.filter((job) => checkedStatuses[job.status.value]);
		}
		if (filterActive === 0) {
			setTotalNumberOfListings(myJobsFiltered.length);
			return myJobsFiltered;
		}
		return allMyJobs;
	}, [checkedStatuses, filterActive, myJobsFiltered, allMyJobs]);

	const myJobMethods = useForm({
		resolver: MyJobValidationSchema,
		defaultValues: defaultMyJobValues,
		mode: "onTouched",
	});

	const myConnectionMethods = useForm({
		resolver: MyConnectionValidationSchema,
		defaultValues: defaultMyConnectionValues,
	});

	const myFutureApplicationMethods = useForm({
		resolver: MyToApplyValidationSchema,
		defaultValues: defaultMyFutureApplicationValues,
	});

	const handleLogout = async () => {
		setIsLoading(true);
		if (logoutUser) {
			await logoutUser()
				.catch((err) => void toast(err.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	}

	const handlePageClick = (pageValue: string) => {
		if (pageValue === homeScreenPages.MY_JOBS && allMyJobs.length === 0) return;
		if (pageValue === homeScreenPages.MY_CONNECTIONS && allMyConnections.length === 0) return;
		if (pageValue === homeScreenPages.MY_FUTURE_APPLICATIONS && userToApplyListings.length === 0) return;
		setHomeScreenState(pageValue);
	}

	const isListingEmpty = (
		page: HomeScreenPagesType
	): boolean => {
		return (
			(page.value === homeScreenPages.MY_JOBS && allMyJobs.length === 0) ||
			(page.value === homeScreenPages.MY_CONNECTIONS && allMyConnections.length === 0) ||
			(page.value === homeScreenPages.MY_FUTURE_APPLICATIONS && userToApplyListings.length === 0)
		);
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

	const getHeading = (page: HomeScreenPagesType): React.ReactNode => {
		const badge = (
			page.title === ConstantItemNames.MY_FUTURE_APPLICATIONS && userToApplyListings.length > 0
				? <Badge
					ml='1rem'
					bg="#FF9999"
					color="#000"
					py={1}
					px={2}
					borderRadius="50%"
				>
					{userToApplyListings.length}
				</Badge>
				: null
		);
		const content = (
			<Text>
				{page.title}
				{badge}
			</Text>
		);
		return isListingEmpty(page)
			? <Tooltip hasArrow label="It is empty.">{content}</Tooltip>
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
			{user && (
				<Flex justifyContent="center">
					<React.Fragment>
						<VStack alignItems="start" w="100%">
							<HStack w="100%">
								<HStack justifyContent="space-evenly" w="100%">
									{homeScreenPagesList.map((page: HomeScreenPagesType, index: number): React.ReactNode => (
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
									<Button leftIcon={<FaPlus/>} variant="outline" colorScheme="gray" onClick={onOpen}>
										Add
									</Button>
									<Button leftIcon={<FaArrowRightFromBracket/>} variant="outline" colorScheme="gray"
									        onClick={handleLogout}>
										Logout [{user.username}]
									</Button>
								</ButtonGroup>
							</HStack>
							<Divider/>
							<HStack alignItems="start" w="100%">
								{homeScreenState === homeScreenPages.MY_JOBS && (
									<MyJobs
										allMyJobs={filteredMyJobs}
										getAllMyJobs={getAllMyJobs}
										allMyConnections={allMyConnections}
										getAllMyConnections={getAllMyConnections}
										allMyFutureApplications={userToApplyListings}
										getAllMyFutureApplications={getAllMyFutureApplications}
										myJobMethods={myJobMethods}
									/>
								)}
								{homeScreenState === homeScreenPages.MY_CONNECTIONS && (
									<MyJobs
										allMyJobs={filteredMyJobs}
										getAllMyJobs={getAllMyJobs}
										allMyConnections={allMyConnections}
										getAllMyConnections={getAllMyConnections}
										allMyFutureApplications={userToApplyListings}
										getAllMyFutureApplications={getAllMyFutureApplications}
									/>
								)}
								{homeScreenState === homeScreenPages.MY_FUTURE_APPLICATIONS && (
									<MyJobs
										allMyJobs={filteredMyJobs}
										getAllMyJobs={getAllMyJobs}
										allMyConnections={allMyConnections}
										getAllMyConnections={getAllMyConnections}
										allMyFutureApplications={userToApplyListings}
										getAllMyFutureApplications={getAllMyFutureApplications}
									/>
								)}
								<VStack w={"100%"}>
									<VStack w={"100%"} p={3} justifyContent="center" gap={5}>
										<Text className={"prevent-select"} fontWeight={"bold"}>Sort By</Text>
										<SortBy
											allMyJobs={allMyJobs}
											setAllMyJobs={setAllMyJobs}
											allMyConnections={allMyConnections}
											setAllMyConnections={setAllMyConnections}
											allMyFutureApplications={userToApplyListings}
											setAllMyFutureApplications={setUserToApplyListings}
										/>
									</VStack>
									{homeScreenState === homeScreenPages.MY_JOBS && (
										<VStack w={"100%"} p={3} justifyContent="center" gap={5}>
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
							</HStack>
						</VStack>
					</React.Fragment>
					<AddListingModal
						isOpen={isOpen}
						onClose={onClose}
						user={user}
						getAllMyJobs={getAllMyJobs}
						getAllMyConnections={getAllMyConnections}
						getAllMyFutureApplications={getAllMyFutureApplications}
						myJobMethods={myJobMethods}
						myConnectionMethods={myConnectionMethods}
						myFutureApplicationMethods={myFutureApplicationMethods}
					/>
				</Flex>
			)}
		</React.Fragment>
	);
};

export default Home;
