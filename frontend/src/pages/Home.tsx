import React, {useEffect} from "react";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import loadingAtom from "../atoms/loadingAtom.ts";
import userAtom from "../atoms/userAtom.ts";
import AddListingModal from "../components/AddListingModal.tsx";
import LoadingOverlay from "../components/LoadingOverlay.tsx";
import MyJobs from "../components/MyJobs.tsx";

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Badge,
	Box,
	Flex,
	Show,
	Text,
	Tooltip,
	useDisclosure
} from "@chakra-ui/react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {useForm} from "react-hook-form";
import {ConnectionActions, JobActions, ToApplyActions} from "../components/AppActions.action.ts";
import {
	CustomUser,
	HomeScreenPagesType,
	MyConnectionResponseModel,
	MyFutureApplicationResponseModel,
	MyJobResponseModel,
	WindowSizeType
} from "../models/types.ts";
import {
	defaultMyConnectionValues,
	defaultMyFutureApplicationValues,
	defaultMyJobValues,
	homeScreenPages
} from "../helpers/constants.ts";
import {MyConnectionValidationSchema, MyJobValidationSchema, MyToApplyValidationSchema} from "../helpers/validators.ts";
import {ConstantItemNames} from "../helpers/enums.ts";
import {toast} from "../helpers/customToast.ts";
import Header from "../components/Header.tsx";
import CombinedFilters from "../components/filtering/CombinedFilters.tsx";
import SortBy from "../components/filtering/SortBy.tsx";
import isPhoneAtom from "../atoms/isPhoneAtom.ts";
import {useTranslation} from "react-i18next";
import Statistics from "../components/statistics/Statistics.tsx";


const Home = () => {
	const {onOpen, isOpen, onClose} = useDisclosure();
	const {onOpen: onOpenStats, isOpen: isOpenStats, onClose: onCloseStats} = useDisclosure();
	const user = useRecoilValue<CustomUser | null>(userAtom);
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const [homeScreenState, setHomeScreenState] = useRecoilState<string>(homeScreenAtom);

	const [allMyJobs, setAllMyJobs] = React.useState<MyJobResponseModel[]>([]);
	const [myJobsFiltered, setMyJobsFiltered] = React.useState<MyJobResponseModel[]>([]);
	const [allMyConnections, setAllMyConnections] = React.useState<MyConnectionResponseModel[]>([]);
	const [allMyFutureConnections, setUserToApplyListings] = React.useState<MyFutureApplicationResponseModel[]>([]);
	const [checkedStatuses, setCheckedStatuses] = React.useState<Record<string, boolean>>({});
	const [totalNumberOfListings, setTotalNumberOfListings] = React.useState<number>(0);
	const [filterActive, setFilterActive] = React.useState<number>(0);
	const setIsPhone = useSetRecoilState<boolean>(isPhoneAtom);
	const [windowSize, setWindowSize] = React.useState<WindowSizeType>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	React.useEffect(() => {
		const handleResize = () => setWindowSize({width: window.innerWidth, height: window.innerHeight});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const {t} = useTranslation();

	React.useEffect(() => setIsPhone(windowSize.width < 400), [setIsPhone, windowSize.width]);

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
	});

	const myConnectionMethods = useForm({
		resolver: MyConnectionValidationSchema,
		defaultValues: defaultMyConnectionValues,
	});

	const myFutureApplicationMethods = useForm({
		resolver: MyToApplyValidationSchema,
		defaultValues: defaultMyFutureApplicationValues,
	});

	const handlePageClick = (pageValue: string) => {
		if (pageValue === homeScreenPages.MY_JOBS && allMyJobs.length === 0) return;
		if (pageValue === homeScreenPages.MY_CONNECTIONS && allMyConnections.length === 0) return;
		if (pageValue === homeScreenPages.MY_FUTURE_APPLICATIONS && allMyFutureConnections.length === 0) return;
		setHomeScreenState(pageValue);
	}

	const isListingEmpty = (
		page: HomeScreenPagesType
	): boolean => {
		return (
			(page.value === homeScreenPages.MY_JOBS && allMyJobs.length === 0) ||
			(page.value === homeScreenPages.MY_CONNECTIONS && allMyConnections.length === 0) ||
			(page.value === homeScreenPages.MY_FUTURE_APPLICATIONS && allMyFutureConnections.length === 0)
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
			page.title === ConstantItemNames.MY_FUTURE_APPLICATIONS && allMyFutureConnections.length > 0
				? <Badge
					ml='1rem'
					bg="#FF9999"
					color="#000"
					py={1}
					px={2}
					borderRadius="50%"
				>
					{allMyFutureConnections.length}
				</Badge>
				: null
		);
		const content = (
			<Text>
				{t(`home.${page.title}`)}
				{badge}
			</Text>
		);
		return isListingEmpty(page)
			? <Tooltip hasArrow label={t("home.emptyListings")}>{content}</Tooltip>
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

	const [statisticsDisabled, setStatisticsDisabled] = React.useState<boolean>(true);

	useEffect(() => {
		setStatisticsDisabled(
			allMyJobs.length === 0 &&
			allMyConnections.length === 0 &&
			allMyFutureConnections.length === 0);
	}, [allMyConnections.length, allMyFutureConnections.length, allMyJobs.length]);

	return (
		<React.Fragment>
			<LoadingOverlay/>
			{user && (
				<React.Fragment>
					<Header
						handlePageClick={handlePageClick}
						getClassName={getClassName}
						getBottomBorder={getBottomBorder}
						getColor={getColor}
						getHeading={getHeading}
						onOpen={onOpen}
						onOpenStats={onOpenStats}
						statisticsDisabled={statisticsDisabled}
					/>
					<Statistics
						isOpen={isOpenStats}
						onClose={onCloseStats}
						allMyJobs={allMyJobs}
						allMyConnections={allMyConnections}
						allMyFutureConnections={allMyFutureConnections}
					/>
					{homeScreenState === homeScreenPages.MY_JOBS ? (
						<Show below={"xl"}>
							<Accordion w={"100%"} allowToggle>
								<AccordionItem border={"none"}>
									<h2>
										<AccordionButton>
											<Box className={"prevent-select"} as='span' flex='1' textAlign='center'>
												{t('home.Filters')}
											</Box>
											<AccordionIcon/>
										</AccordionButton>
									</h2>
									<AccordionPanel
										justifyContent={"center"}
										display={"flex"}
										flexDirection={"column"}
										p={0}
									>
										<CombinedFilters
											allMyJobs={allMyJobs}
											setAllMyJobs={setAllMyJobs}
											setMyJobsFiltered={setMyJobsFiltered}
											setFilterActive={setFilterActive}
											setCheckedStatuses={setCheckedStatuses}
											checkedStatuses={checkedStatuses}
											setAllMyConnections={setAllMyConnections}
											allMyConnections={allMyConnections}
											allMyFutureConnections={allMyFutureConnections}
											setUserToApplyListings={setUserToApplyListings}
											totalNumberOfListings={totalNumberOfListings}
										/>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Show>
					) : (
						<Show below={"xl"}>
							<SortBy
								allMyJobs={allMyJobs}
								setAllMyJobs={setAllMyJobs}
								allMyConnections={allMyConnections}
								setAllMyConnections={setAllMyConnections}
								allMyFutureApplications={allMyFutureConnections}
								setAllMyFutureApplications={setUserToApplyListings}
							/>
						</Show>
					)}
					<Flex justifyContent={"space-evenly"} mt={4} mb={6}>
						<React.Fragment>
							{homeScreenState === homeScreenPages.MY_JOBS && (
								<MyJobs
									allMyJobs={filteredMyJobs}
									getAllMyJobs={getAllMyJobs}
									allMyConnections={allMyConnections}
									getAllMyConnections={getAllMyConnections}
									allMyFutureApplications={allMyFutureConnections}
									getAllMyFutureApplications={getAllMyFutureApplications}
								/>
							)}
							{homeScreenState === homeScreenPages.MY_CONNECTIONS && (
								<MyJobs
									allMyJobs={filteredMyJobs}
									getAllMyJobs={getAllMyJobs}
									allMyConnections={allMyConnections}
									getAllMyConnections={getAllMyConnections}
									allMyFutureApplications={allMyFutureConnections}
									getAllMyFutureApplications={getAllMyFutureApplications}
								/>
							)}
							{homeScreenState === homeScreenPages.MY_FUTURE_APPLICATIONS && (
								<MyJobs
									allMyJobs={filteredMyJobs}
									getAllMyJobs={getAllMyJobs}
									allMyConnections={allMyConnections}
									getAllMyConnections={getAllMyConnections}
									allMyFutureApplications={allMyFutureConnections}
									getAllMyFutureApplications={getAllMyFutureApplications}
								/>
							)}
							<Show above={"xl"}>
								<CombinedFilters
									allMyJobs={allMyJobs}
									setAllMyJobs={setAllMyJobs}
									setMyJobsFiltered={setMyJobsFiltered}
									setFilterActive={setFilterActive}
									setCheckedStatuses={setCheckedStatuses}
									checkedStatuses={checkedStatuses}
									setAllMyConnections={setAllMyConnections}
									allMyConnections={allMyConnections}
									allMyFutureConnections={allMyFutureConnections}
									setUserToApplyListings={setUserToApplyListings}
									totalNumberOfListings={totalNumberOfListings}
								/>
							</Show>
						</React.Fragment>
					</Flex>
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
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Home;
