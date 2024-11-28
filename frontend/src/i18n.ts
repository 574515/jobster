import i18n from 'i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import enGB from './locales/en-GB.json';
import svSE from './locales/sv-SE.json';

import {initReactI18next} from 'react-i18next';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			enGB: {translation: enGB},
			svSE: {translation: svSE},
		},
		lng: 'enGB',
		fallbackLng: 'enGB',
		interpolation: {
			escapeValue: false
		},
	});

export default i18n;
