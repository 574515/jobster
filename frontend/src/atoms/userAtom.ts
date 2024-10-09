import {atom} from 'recoil';

const userAtom = atom({
	key: 'userAtom',
	default: (() => {
		const storedAuthTokens = localStorage.getItem('userToken');
		return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
	})(),
});

export default userAtom;
