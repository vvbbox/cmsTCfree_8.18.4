import { atom } from 'recoil';
const picturesAtom = atom({
    key: 'pictures',
    default: null
});

const pictureAtom = atom({
    key: 'picture',
    default: null
});

export {
    picturesAtom,
    pictureAtom
};