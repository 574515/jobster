import {atom} from 'recoil';
import {CustomUser} from "../models/types.ts";

const userAtom = atom<CustomUser | null>({
	key: 'userAtom',
	default: (() => {
		const storedAuthTokens = localStorage.getItem('userToken');
		return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
	})(),
});

export default userAtom;
