import React from "react";

import userAtom from "../atoms/userAtom.ts";

import {Flex, Text, useColorMode} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";

const Home = () => {
	const user = useRecoilValue(userAtom);
	const {colorMode} = useColorMode();
	const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
	const [flexBackground, setFlexBackground] = React.useState<string>("");

	React.useEffect(() => {
		setIsDarkMode(colorMode === "dark");
	}, [colorMode])

	React.useEffect(() => {
		setFlexBackground(isDarkMode ? "gray.700" : "gray.300");
	}, [isDarkMode]);

	return (
		<Flex
			border={'3px solid red'}
			width={'25vw'}
			height={'50vh'}
			my={'2rem'}
			justifyContent={'center'}
			bg={flexBackground}
		>
			{user &&
                <Text
                    my={'1rem'}
                >
                    Hi, <a href={"/"}>{user.username}</a>
                </Text>
			}
		</Flex>
	);
}

export default Home;