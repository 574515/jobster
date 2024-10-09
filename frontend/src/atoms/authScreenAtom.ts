import {atom, RecoilState} from 'recoil';

const authScreenAtom: RecoilState<string> = atom({
    key: 'authScreenAtom',
    default: 'login',
});

export default authScreenAtom;
