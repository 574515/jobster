import {atom} from 'recoil';
import {CustomUser} from "../models/contextTypes.ts";

const userAtom = atom<CustomUser>({
	key: 'userAtom',
	default: (() => {
		const storedAuthTokens = localStorage.getItem('userToken');
		return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
	})(),
});

export default userAtom;
