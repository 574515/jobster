import {atom, RecoilState} from 'recoil';

const languageAtom: RecoilState<string> = atom({
	key: 'languageAtom',
	default: 'en-GB',
});

export default languageAtom;