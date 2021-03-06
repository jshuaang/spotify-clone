import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { CurrentSongId, IsPlaying } from "../Atom/SongState";
import useSpotify from "./useSpotify";

function detailSong() {
    const spotifyApi = useSpotify();
    const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongId);
    const [isPlaying, setIsPlaying] = useRecoilState(IsPlaying);
    const [songInfo, setSongInfo] = useState({});

    useEffect(() => {
        const fetchSongInfo = async() => {
            if(currentSongId){
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentSongId}`,
                    {
                        headers:{
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json())

                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    }, [spotifyApi, currentSongId])

    return songInfo
}

export default detailSong
