import {atom, RecoilState} from 'recoil';

const darkModeAtom: RecoilState<boolean> = atom({
	key: 'darkModeAtom',
	default: true,
});

export default darkModeAtom;
