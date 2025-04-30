import { atom } from 'recoil';
const areaAtom = atom({
    key: 'area',
    default: 'api'
});

export {
    areaAtom
};