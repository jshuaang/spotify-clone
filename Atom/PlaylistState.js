import { atom } from "recoil";

export const PlaylistIdState = atom({
  key: 'PlaylistIdState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});