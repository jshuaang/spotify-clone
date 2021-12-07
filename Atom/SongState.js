import { atom } from "recoil";

export const CurrentSongId = atom({
    key: 'CurrentSongId',
    default: null
})

export const IsPlaying = atom({
    key: 'IsPlaying',
    default: false
})