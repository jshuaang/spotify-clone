import { useRecoilState } from "recoil"
import { CurrentSongId, IsPlaying } from "../Atom/SongState"
import useSpotify from "../hooks/useSpotify";
import countDuration from "../lib/countDuration"

function Song({track, number}) {
    const spotifyApi = useSpotify();
    const [currentSong, setCurrentSong] = useRecoilState(CurrentSongId)
    const [isPlaying, setIsPlaying] = useRecoilState(IsPlaying);

    const playSong = () => {
        setCurrentSong(track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.uri],
        })
    }

    return (
        <div 
        onClick={playSong}
        className="text-gray-500 p-2 space-x-4 items-center px-10 hover:bg-gray-900 cursor-pointer mx-2 grid grid-cols-2 ">
            <div className="flex space-x-3 items-center">
                <p>{number+1}</p>
                <img src={track.album.images[0].url} className="h-10 w-10" />
                <div className="w-1/2 md:w-1/3">
                    <p className="text-white truncate">{track.name}</p>
                    <p>{track.artists[0].name}</p>
                </div>
            </div>
            <div className="flex">
                <p className="ml-0 truncate hidden lg:block">{track.album.name}</p>
                <p className="ml-auto mr-0">{countDuration(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
