import { atom } from 'recoil';

export const counterAtom = atom({
  key: 'counter',   // unique string
  default: 0,       // initial value
});
