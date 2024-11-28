import {homeScreenPages, homeScreenPagesList} from "../helpers/constants.ts";
import {AuthContextType, CustomUser, HomeScreenPagesType} from "../models/types.ts";
import React from "react";
import {Button, ButtonGroup, Divider, Flex, Heading, VStack} from "@chakra-ui/react";
import {FaArrowRightFromBracket, FaPlus} from "react-icons/fa6";
import {toast} from "../helpers/customToast.ts";
import AuthContext from "../context/AuthContext.tsx";
import {useRecoilValue, useSetRecoilState} from "recoil";
import loadingAtom from "../atoms/loadingAtom.ts";
import userAtom from "../atoms/userAtom.ts";
import {HeaderProps} from "../models/interfaces.ts";
import homeScreenAtom from "../atoms/homeScreenAtom.ts";

const Header: React.FC<HeaderProps> = (
	{
		handlePageClick, getClassName, getBottomBorder, getColor, getHeading, onOpen
	}
) => {
	const authContext = React.useContext<AuthContextType | undefined>(AuthContext);
	const logoutUser = authContext ? authContext.logoutUser : undefined;
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const user = useRecoilValue<CustomUser | null>(userAtom);
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);

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
				<ButtonGroup mt={{base: "1rem", sm: "unset"}}>
					<Button leftIcon={<FaPlus/>} variant="outline" colorScheme="gray"
					        onClick={onOpen}>
						Add
					</Button>
					<Button leftIcon={<FaArrowRightFromBracket/>} variant="outline"
					        colorScheme="gray"
					        onClick={handleLogout}>
						Logout [{user.username}]
					</Button>
				</ButtonGroup>
			</Flex>
			{homeScreenState === homeScreenPages.MY_JOBS && <Divider/>}
		</VStack>
	);
}

export default Header;