import {useEffect} from 'react';

import darkModeAtom from "../../atoms/darkModeAtom.ts";

import {useColorMode} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {CustomColorModeIconType} from "../../models/types.ts";
import {useRecoilState} from "recoil";

const CustomColorModeSwitch = () => {
	const {colorMode, toggleColorMode} = useColorMode();
	const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(darkModeAtom);
	const iconProps: CustomColorModeIconType = {
		fontSize: '1.5rem',
		onClick: () => toggleColorMode(),
		className: 'make-pointer',
		me: 'auto',
	};

	useEffect(() => setIsDarkMode(colorMode === "dark"), [colorMode, setIsDarkMode]);
	return isDarkMode ? <SunIcon {...iconProps} /> : <MoonIcon {...iconProps} />;
}

export default CustomColorModeSwitch;