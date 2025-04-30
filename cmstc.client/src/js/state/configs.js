import { atom } from 'recoil';

const configsAtom = atom({
    key: 'configs',
    default: null
});

const configAtom = atom({
    key: 'config',
    default: null
});

export {
    configsAtom,
    configAtom
};