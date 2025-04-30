import { atom } from 'recoil';

const contextsAtom = atom({
    key: 'contexts',
    default: null
});

const contextAtom = atom({
    key: 'context',
    default: null
});

export {
    contextsAtom,
    contextAtom,
  
};