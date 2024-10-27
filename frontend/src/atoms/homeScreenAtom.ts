import {atom, RecoilState} from 'recoil';

const homeScreenAtom: RecoilState<string> = atom({
	key: 'homeScreenAtom',
	default: 'myJobs',
});

export default homeScreenAtom;
