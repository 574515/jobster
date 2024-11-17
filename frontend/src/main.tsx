import React from 'react'

import App from './App.tsx'

import {createRoot} from 'react-dom/client'
import {RecoilRoot} from "recoil";
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider, ColorModeScript, extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";
import {ThemeType} from "./models/componentsTypes.ts";

import './index.css'

const styles = {
	global: (props: ThemeType) => ({
		body: {
			color: mode('gray.800', 'whiteAlpha.900')(props),
			bg: 'url(/login.jpeg)  no-repeat center center cover',
		},
	}),
};

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: true,
};

const colors = {
	gray: {
		light: '#616161',
		dark: '#292929',
	},
};

const theme = extendTheme({config, styles, colors});

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode}/>
					<App/>
				</ChakraProvider>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>,
)
