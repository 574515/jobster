import React from 'react';

import languageAtom from '../../atoms/languageAtom';
import loadingAtom from "../../atoms/loadingAtom.ts";
import Flag from 'react-world-flags';

import {useRecoilState} from 'recoil';
import {useTranslation} from 'react-i18next';
import {Flex, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Text} from '@chakra-ui/react';
import {CustomLanguageSwitcherProps} from "../../models/types.ts";
import {toast} from "../../helpers/customToast.ts";

const CustomLanguageSwitcher = () => {
	const {i18n} = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useRecoilState(languageAtom);
	const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingAtom);

	const languages: CustomLanguageSwitcherProps[] = [
		{languageCode: 'enGB', flagCode: 'GB', label: 'English'},
		{languageCode: 'svSE', flagCode: 'SE', label: 'Svenska'},
	];
	const selectedLanguage = languages.find(lang => lang.languageCode === currentLanguage) || languages[0];

	React.useEffect(() => {
		setIsLoading(true);
		const savedLanguage = localStorage.getItem('language') || 'en-GB';
		i18n.changeLanguage(savedLanguage)
			.then(() => setCurrentLanguage(savedLanguage))
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	}, [i18n, setCurrentLanguage, setIsLoading]);

	const changeLanguage = (languageCode: string) => {
		if (currentLanguage === languageCode) return;
		setIsLoading(true);
		i18n.changeLanguage(languageCode)
			.then(() => {
				setCurrentLanguage(languageCode);
				localStorage.setItem('language', languageCode);
			})
			.catch((error) => void toast(error.response.data.error, 'error'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Menu placement={"bottom-end"}>
			<MenuButton
				as={IconButton}
				icon={<Flag code={selectedLanguage.flagCode} style={{width: 24, height: 16}}/>}
				variant="ghost"
				isLoading={isLoading}
				_active={{background: "none"}}
				_hover={{background: "none"}}
			/>
			<MenuList>
				<MenuOptionGroup value={selectedLanguage.languageCode} type="radio">
					{languages.map((lang) => (
						<MenuItemOption
							key={lang.languageCode}
							value={lang.languageCode}
							onClick={() => changeLanguage(lang.languageCode)}
						>
							<Flex alignItems={"center"} gap={2}>
								<Flag code={lang.flagCode} style={{width: 24, height: 16}}/>
								<Text>{lang.label}</Text>
							</Flex>
						</MenuItemOption>
					))}
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	);
};

export default CustomLanguageSwitcher;
