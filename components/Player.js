import { VolumeUpIcon as VolumeDownIcon }  from "@heroicons/react/outline";
import { FastForwardIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, PauseIcon, PlayIcon, VolumeUpIcon  } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil"
import { CurrentSongId, IsPlaying } from "../Atom/SongState";
import detailSong from "../hooks/detailSong";
import useSpotify from "../hooks/useSpotify";

function Player() {
    const spotifyApi = useSpotify();
    const [currentSongId, setCurrentSongId] = useRecoilState(CurrentSongId);
    const [isPlaying, setIsPlaying] = useRecoilState(IsPlaying);
    const [volume, setVolume] = useState(50);
    const songInfo = detailSong();

    const PlayPause = async() => {
        if(spotifyApi.getAccessToken()){
            const status = await spotifyApi.getMyCurrentPlaybackState()
            if(status.body.is_playing){
                setIsPlaying(false)
                spotifyApi.pause();
            }else{
                setIsPlaying(true)
                spotifyApi.play();
            }
        }
    }

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            debounceVolume(volume)
        }
    }, [volume])


    const debounceVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume)
        },500),
        [],
    );

    return (
        <div className="text-white grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 p-2 px-5">
            {/* left */}
            <div className="flex items-center space-x-4">
                <img src={songInfo?.album?.images[0]?.url} className="w-10 h-10" />
                <div className="hidden sm:inline">
                    <p className="font-bold truncate">{songInfo?.name}</p>
                    <p className="font-semibold truncate">{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* middle */}
            <div className="flex justify-evenly items-center">
                <SwitchHorizontalIcon className="h-5 w-5 cursor-pointer hover:scale-125 ease-out duration-75" />
                <RewindIcon className="h-5 w-5 cursor-pointer hover:scale-125 ease-out duration-75" />

                {isPlaying ? 
                    (<PauseIcon onClick={PlayPause}  className="h-10 w-10 hover:text-gray-300 cursor-pointer hover:scale-125 ease-out duration-75" />) : (<PlayIcon onClick={PlayPause} className="h-10 w-10 hover:text-gray-300 cursor-pointer hover:scale-125 ease-out duration-75" />)
                } 

                <FastForwardIcon className="h-5 w-5 cursor-pointer hover:scale-125 ease-out duration-75" />
                <ReplyIcon className="h-5 w-5 cursor-pointer hover:scale-125 ease-out duration-75" />
            </div>

            {/* right */}
            <div className="flex justify-end items-center md:mr-5 space-x-3">
                <VolumeDownIcon className="h-5 w-5 cursor-pointer hover:scale-125 ease-out duration-75" 
                onClick={() => {
                    if(volume > 0){
                        setVolume(volume -= 10);
                    }
                } }/>
                <input type="range" onChange={e => setVolume(Number(e.target.value))} value={volume} min={0} max={100} className="w-14 md:w-28 lg:w-36"/>
                <VolumeUpIcon className="h-5 w-5 cursor-pointer hover:scale-125 ease-out duration-75" 
                 onClick={() => {
                    if(volume < 100){
                        setVolume(volume += 10);
                    }
                } }
                />
            </div>
        </div>
    )
}

export default Player
