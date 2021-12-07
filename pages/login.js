import LogoSpotify from "../assets/spotify-logo.png"
import Image from "next/image"
import {getProviders, signIn} from "next-auth/react";

function login({providers}) {
    return (
        <div className="bg-black min-h-screen text-center flex flex-col justify-center space-y-5">
            <div>
                <Image 
                    src={LogoSpotify}
                    width={200}
                    height={200}
                />
            </div>
            {Object.values(providers).map((provider) => (
                <button key={provider.id} onClick={() => signIn(provider.id, {callbackUrl:'/'})} className="w-1/4 p-2 rounded-lg bg-[#18D860] text-white font-semibold m-auto">Login with {provider.name}</button>
            ))}
        </div>
    )
}

export default login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}