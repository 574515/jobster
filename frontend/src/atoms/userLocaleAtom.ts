import {atom, RecoilState} from 'recoil';
import getUserLocale from "get-user-locale";

const userLocaleAtom: RecoilState<string> = atom({
	key: 'userLocaleAtom',
	default: getUserLocale(),
});

export default userLocaleAtom;