import {homeScreenPages, homeScreenPagesList} from "../helpers/constants.ts";
import {AuthContextType, CustomUser, HomeScreenPagesType} from "../models/types.ts";
import React from "react";
import {Button, ButtonGroup, Divider, Flex, Heading, Show, VStack} from "@chakra-ui/react";
import {FaArrowRightFromBracket, FaChartSimple, FaPlus} from "react-icons/fa6";
import {toast} from "../helpers/customToast.ts";
import AuthContext from "../context/AuthContext.tsx";
import {useRecoilValue, useSetRecoilState} from "recoil";
import loadingAtom from "../atoms/loadingAtom.ts";
import userAtom from "../atoms/userAtom.ts";
import {HeaderProps} from "../models/interfaces.ts";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import {useTranslation} from "react-i18next";
import isPhoneAtom from "../atoms/isPhoneAtom.ts";
import CustomColorModeSwitch from "./customComponents/CustomColorModeSwitch.tsx";
import CustomLanguageSwitcher from "./customComponents/CustomLanguageSwitcher.tsx";

const Header: React.FC<HeaderProps> = (
	{
		handlePageClick, getClassName, getBottomBorder, getColor, getHeading, onOpen, onOpenStats, statisticsDisabled
	}
) => {
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const logoutUser = authContext ? authContext.logoutUser : undefined;
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const user = useRecoilValue<CustomUser | null>(userAtom);
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);
	const isPhone = useRecoilValue(isPhoneAtom);
	const {t} = useTranslation();

	const handleLogout = async () => {
		setIsLoading(true);
		if (logoutUser) {
			await logoutUser()
				.catch((err) => void toast(err.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}
	}

	return user && (
		<VStack mt={{md: 4}}>
			<Flex
				justifyContent="space-evenly"
				w="100%"
				alignItems={"center"}
				flexDirection={{base: "column-reverse", xl: "row"}}
			>
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
				<Show below={"xl"}>
					<ButtonGroup my={2} alignItems={"center"} justifyContent="space-evenly" w={"100%"}>
						<Button
							w={"full"}
							leftIcon={<FaChartSimple/>}
							variant="outline"
							colorScheme="gray"
							onClick={onOpenStats}
							my={2}
							isDisabled={statisticsDisabled}
						>
							{t('statistics.Statistics')}
						</Button>
						<CustomColorModeSwitch/>
						<CustomLanguageSwitcher/>
					</ButtonGroup>
					<ButtonGroup w={"100%"} my={2} justifyContent={"space-evenly"}>
						<Button
							w={"full"}
							leftIcon={<FaPlus/>}
							variant="outline"
							colorScheme="gray"
							onClick={onOpen}
						>
							{t('home.Add')}
						</Button>
						<Button
							w={"full"}
							leftIcon={<FaArrowRightFromBracket/>}
							variant="outline"
							colorScheme="gray"
							onClick={handleLogout}
						>
							{t('home.LogOut')} {!isPhone && [user.username]}
						</Button>
					</ButtonGroup>
				</Show>
				<Show above={"xl"}>
					<ButtonGroup mt={{base: "1rem", sm: "unset"}} alignItems={"center"}>
						<Button
							leftIcon={<FaPlus/>}
							variant="outline"
							colorScheme="gray"
							onClick={onOpen}
						>
							{t('home.Add')}
						</Button>
						<Button
							leftIcon={<FaChartSimple/>}
							variant="outline"
							colorScheme="gray"
							onClick={onOpenStats}
							isDisabled={statisticsDisabled}
						>
							{t('statistics.Statistics')}
						</Button>
						<Button
							leftIcon={<FaArrowRightFromBracket/>}
							variant="outline"
							colorScheme="gray"
							onClick={handleLogout}
						>
							{t('home.LogOut')} [{user.username}]
						</Button>
						<CustomLanguageSwitcher/>
						<CustomColorModeSwitch/>
					</ButtonGroup>
				</Show>
			</Flex>
			{homeScreenState === homeScreenPages.MY_JOBS && <Divider/>}
		</VStack>
	);
}

export default Header;