import {FC, Fragment, ReactNode, useEffect, useState} from "react";

import homeScreenAtom from "../../atoms/homeScreenAtom.ts";
import isPhoneAtom from "../../atoms/isPhoneAtom.ts";
import CustomStatistic from "./components/CustomStatistic.tsx";
import MyJobStatistic from "./components/MyJobStatistic.tsx";

import {StatisticsProps} from "../../models/interfaces.ts";
import {useRecoilValue} from "recoil";
import {useTranslation} from "react-i18next";
import {
	Divider,
	FormControl,
	FormLabel,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Switch,
	Text,
} from "@chakra-ui/react";
import {constantHomeScreenPageName, homeScreenPages} from "../../helpers/constants.ts";

import "../../styles/componentStyle.css";

const Statistics: FC<StatisticsProps> = (
	{isOpen, onClose, allMyJobs, allMyConnections, allMyFutureConnections}
) => {
	const isPhone = useRecoilValue<boolean>(isPhoneAtom);
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);
	const [showAll, setShowAll] = useState<boolean>(false);
	const [renderedStatistics, setRenderedStatistics] = useState<ReactNode>();
	const [visibleShowAllButton, setVisibleShowAllButton] = useState<boolean>(false);
	const {t} = useTranslation();

	useEffect(() => {
		const arrays = [allMyJobs, allMyConnections, allMyFutureConnections];
		const nonEmptyCount = arrays.filter((arr) => arr.length > 0).length;
		setVisibleShowAllButton(nonEmptyCount >= 2);
	}, [allMyConnections, allMyFutureConnections, allMyJobs]);

	useEffect(() => {
		if (showAll) {
			switch (homeScreenState) {
				case homeScreenPages.MY_FUTURE_APPLICATIONS:
					setRenderedStatistics(
						<Fragment>
							{allMyFutureConnections.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_FUTURE_APPLICATIONS}`)}
									</Text>
									<CustomStatistic myFutureApplicationData={allMyFutureConnections}/>
								</Fragment>
							)}
							{allMyJobs.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_JOBS}`)}
									</Text>
									<MyJobStatistic allMyJobs={allMyJobs}/>
								</Fragment>
							)}
							{allMyConnections.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_CONNECTIONS}`)}
									</Text>
									<CustomStatistic myConnectionData={allMyConnections}/>
								</Fragment>
							)}
						</Fragment>
					);
					break;
				case homeScreenPages.MY_CONNECTIONS:
					setRenderedStatistics(
						<Fragment>
							{allMyConnections.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_CONNECTIONS}`)}
									</Text>
									<CustomStatistic myConnectionData={allMyConnections}/>
								</Fragment>
							)}
							{allMyJobs.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_JOBS}`)}
									</Text>
									<MyJobStatistic allMyJobs={allMyJobs}/>
								</Fragment>
							)}
							{allMyFutureConnections.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_FUTURE_APPLICATIONS}`)}
									</Text>
									<CustomStatistic myFutureApplicationData={allMyFutureConnections}/>
								</Fragment>
							)}
						</Fragment>
					);
					break;
				case homeScreenPages.MY_JOBS:
					setRenderedStatistics(
						<Fragment>
							{allMyJobs.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_JOBS}`)}
									</Text>
									<MyJobStatistic allMyJobs={allMyJobs}/>
								</Fragment>
							)}
							{allMyConnections.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_CONNECTIONS}`)}
									</Text>
									<CustomStatistic myConnectionData={allMyConnections}/>
								</Fragment>
							)}
							{allMyFutureConnections.length > 0 && (
								<Fragment>
									<Text
										textAlign={"center"}
										mt={4}
									>
										{t(`home.${constantHomeScreenPageName.MY_FUTURE_APPLICATIONS}`)}
									</Text>
									<CustomStatistic myFutureApplicationData={allMyFutureConnections}/>
								</Fragment>
							)}
						</Fragment>
					);
					break;
				default:
					break;
			}
		} else {
			setRenderedStatistics(
				<Fragment>
					{homeScreenState === homeScreenPages.MY_JOBS && <MyJobStatistic allMyJobs={allMyJobs}/>}
					{homeScreenState === homeScreenPages.MY_CONNECTIONS &&
                        <CustomStatistic myConnectionData={allMyConnections}/>}
					{homeScreenState === homeScreenPages.MY_FUTURE_APPLICATIONS &&
                        <CustomStatistic myFutureApplicationData={allMyFutureConnections}/>}
				</Fragment>
			);
		}
	}, [allMyConnections, allMyFutureConnections, allMyJobs, homeScreenState, isPhone, showAll, t]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				setShowAll(false);
				onClose();
			}}
			size={{base: "xs", md: "2xl"}}
			isCentered={isPhone}
		>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader alignItems={"center"} justifyContent="center">
					{t("statistics.Statistics")}
				</ModalHeader>
				<ModalCloseButton my={2}/>
				<ModalBody px={isPhone ? 0 : 2}>
					{!isPhone && visibleShowAllButton && (
						<Fragment>
							<FormControl mb={6} display={"flex"} alignItems={"center"} justifyContent={"center"}>
								<FormLabel htmlFor={"showAll"} mb={0}>
									{t("statistics.showAll")}
								</FormLabel>
								<Switch
									id={"showAll"}
									onChange={() => setShowAll(!showAll)}
									isChecked={showAll}
								/>
							</FormControl>
							<Divider/>
						</Fragment>
					)}
					{renderedStatistics}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default Statistics;
