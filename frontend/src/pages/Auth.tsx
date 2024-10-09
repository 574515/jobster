import authScreenAtom from '../atoms/authScreenAtom.ts';
import SignupCard from "../components/SignupCard.tsx";
import LoginCard from "../components/LoginCard.tsx";

import {useRecoilValue} from 'recoil';

import '../styles/pagesStyle.css'

const Auth = () => {
	const authScreenState = useRecoilValue(authScreenAtom);
	return (authScreenState === 'login' ? <LoginCard/> : <SignupCard/>);
}

export default Auth;