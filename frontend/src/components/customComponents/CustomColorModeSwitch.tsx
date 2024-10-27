import React from 'react';

import {useColorMode} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {CustomColorModeIcon} from "../../models/componentsTypes.ts";

const CustomColorModeSwitch = () => {
	const {colorMode, toggleColorMode} = useColorMode();
	const [isDarkMode, setIsDarkMode] = React.useState<boolean>(colorMode === 'dark');
	const iconProps: CustomColorModeIcon = {
		fontSize: '1.5rem',
		onClick: () => toggleColorMode(),
		className: 'make-pointer',
		me: 'auto',
	}

	React.useEffect(() => {
		setIsDarkMode(colorMode === 'dark');
	}, [colorMode]);

	return (
		isDarkMode ?
			<SunIcon {...iconProps} /> :
			<MoonIcon {...iconProps} />
	);
}

export default CustomColorModeSwitch;