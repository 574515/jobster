import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {en_GB, sv_SE} from './locales/';
import {initReactI18next} from 'react-i18next';

void i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			enGB: {translation: en_GB},
			svSE: {translation: sv_SE},
		},
		fallbackLng: 'enGB',
		interpolation: {escapeValue: false},
		keySeparator: '.',
	});

export default i18n;
