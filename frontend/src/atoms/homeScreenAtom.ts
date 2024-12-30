import {atom, RecoilState} from 'recoil'
import {homeScreenPages} from "../helpers/constants.ts";

const homeScreenAtom: RecoilState<string> = atom({
	key: 'homeScreenAtom',
	default: homeScreenPages.MY_JOBS,
});

export default homeScreenAtom;
