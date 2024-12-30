import {atom, RecoilState} from 'recoil';

const isPhoneAtom: RecoilState<boolean> = atom({
	key: 'isPhoneAtom',
	default: false,
});

export default isPhoneAtom;
