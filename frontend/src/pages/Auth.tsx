import authScreenAtom from '../atoms/authScreenAtom.ts';
import LoginCard from "../components/LoginCard.tsx";
import SignupCard from "../components/SignupCard.tsx";

import {useRecoilValue} from 'recoil';

import '../styles/pagesStyle.css'

const Auth = () => {
	const authScreenState = useRecoilValue<string>(authScreenAtom);
	return (authScreenState === 'login' ? <LoginCard/> : <SignupCard/>);
}

export default Auth;