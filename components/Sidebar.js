import {HomeIcon, SearchIcon, BriefcaseIcon, PlusCircleIcon, HeartIcon, WifiIcon} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PlaylistIdState } from "../Atom/PlaylistState";
import useSpotify  from "../hooks/useSpotify"

function Sidebar() {
    const session = useSession();
    const spotifyApi = useSpotify();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistsId] = useRecoilState(PlaylistIdState);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists()
            .then(({body}) => {
                setPlaylists(body.items)
                setPlaylistsId(body.items[0].id)
            })
        }
    }, [session, spotifyApi])

    return (
        <div className="p-5 text-sm border-r border-gray-900 text-gray-500 overflow-y-scroll h-screen scrollbar-hide pr-10 hidden md:inline-block">
            <div className="space-y-4">
                <div className="flex items-center space-x-2 hover:text-white cursor-pointer">
                    <HomeIcon className="h-5" />
                    <p>Home</p>
                </div>
                <div className="flex items-center space-x-2 hover:text-white cursor-pointer">
                    <SearchIcon className="h-5" />
                    <p>Search</p>
                </div>
                <div className="flex items-center space-x-2 hover:text-white cursor-pointer">
                    <BriefcaseIcon className="h-5" />
                    <p>Your Library</p>
                </div>
                <hr className="border-t-[0.1px] border-gray-900"/>

                <div className="flex items-center space-x-2 hover:text-white cursor-pointer">
                    <PlusCircleIcon className="h-5" />
                    <p>Create Playlist</p>
                </div>
                <div className="flex items-center space-x-2 hover:text-white cursor-pointer">
                    <HeartIcon className="h-5" />
                    <p>Liked Songs</p>
                </div>
                <div className="flex items-center space-x-2 hover:text-white cursor-pointer">
                    <WifiIcon className="h-5" />
                    <p>Your Episodes</p>
                </div>
                <hr className="border-t-[0.1px] border-gray-900"/>

                {/* playlist */}
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setPlaylistsId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
