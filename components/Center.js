import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlaylistIdState } from "../Atom/PlaylistState";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";

const colors = [
    "from-indigo-500",
    "from-red-500",
    "from-blue-500",
    "from-green-500",
    "from-yellow-500",
    "from-purple-500"
];

function Center() {
    const spotifyApi = useSpotify();
    const {data: session} = useSession();
    const [color, setColor] = useState(null);
    const [playlistId, setPlaylistId] = useRecoilState(PlaylistIdState);
    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getPlaylist(playlistId)
            .then(({body}) => setPlaylist(body))
        }
    }, [playlistId])

    return (
        <div className="flex-grow w-full">
            <header className="relative overflow-y-scroll h-screen scrollbar-hide">
                <div onClick={() => signOut()} className="text-white bg-black flex space-x-1 items-center p-1 pr-2 rounded-full cursor-pointer hover:opacity-80 opacity-90 absolute top-5 right-10">
                    <img src={session?.user.image} className="w-10 h-10 rounded-full" />
                    <h4 className="font-semibold text-sm">{session?.user.name}</h4>
                    <ChevronDownIcon className="w-4" />
                </div>
                <section className={`h-80 flex items-end bg-gradient-to-b ${color} to-black p-8 space-x-4`}>
                    <img src={playlist?.images[0].url} className="w-48 h-48" />
                    <div className="text-white">
                        <h2 className="uppercase font-semibold text-xl">Playlist</h2>
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl">{playlist?.name}</h1>
                    </div>
                </section>
                <div className="flex-col space-y-1 pb-48">
                    {playlist?.tracks.items.map(({track}, i) => (
                        <Song key={track.id} track={track} number={i}/>
                    ))}
                </div>
            </header>
        </div>
    )
}

export default Center
