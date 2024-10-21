import Auth from './pages/Auth.tsx';
import Home from './pages/Home.tsx';
import AxiosInterceptor from "./components/AxiosInterceptor.tsx";
import authScreenAtom from "./atoms/authScreenAtom.ts";
import userAtom from './atoms/userAtom.ts';

import {Navigate, Route, Routes,} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {AuthProvider} from './context/AuthContext.tsx';
import {Box, useColorMode} from "@chakra-ui/react";

import './styles/pagesStyle.css'

function App() {
	const user = useRecoilValue(userAtom);
	const getAuthScreen = useRecoilValue(authScreenAtom);
	const {colorMode} = useColorMode();
	let currentClass;

	const getCurrentClas = (path: string, isDark: boolean, isLogin: boolean) => {
		if (path === '/auth') {
			if (isLogin) currentClass = isDark ? 'body-login-dark' : 'body-login';
			else currentClass = isDark ? 'body-signup-dark' : 'body-signup';
		} else currentClass = isDark ? 'body-app-dark' : 'body-app';
	}

	getCurrentClas(location.pathname, colorMode === 'dark', getAuthScreen === 'login');

	return (
		<AuthProvider>
			<AxiosInterceptor/>
			<Box className={`${currentClass}`}></Box>
			<Box className={"content"}>
				<Routes>
					<Route path='/' element={user ? <Home/> : <Navigate to='/auth'/>}/>
					<Route path='/auth' element={!user ? <Auth/> : <Navigate to='/'/>}/>
				</Routes>
			</Box>
		</AuthProvider>
	)
}

export default App
