import {AuthProvider} from "./context/AuthContext.tsx";
import AxiosInterceptor from "./components/AxiosInterceptor.tsx";
import {Box} from "@chakra-ui/react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useRecoilValue} from "recoil";
import Home from "./pages/Home.tsx";
import Auth from "./pages/Auth.tsx";
import userAtom from "./atoms/userAtom.ts";

function App() {
	const user = useRecoilValue(userAtom);

	return (
		<AuthProvider>
			<AxiosInterceptor/>
			<Box className={"container"}></Box>
			<Box className={"content"}>
				{/*<Header/>*/}
				<Routes>
					<Route path='/' element={user ? <Home/> : <Navigate to='/auth'/>}/>
					<Route path='/auth' element={!user ? <Auth/> : <Navigate to='/'/>}/>
				</Routes>
			</Box>
		</AuthProvider>
	)
}

export default App
