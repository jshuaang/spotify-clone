import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Center from '../components/Center'
import Player from '../components/Player';
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex">
        {/* sidebar */}
        <Sidebar />
        {/* main home */}
        <Center />
      </main>

      <div className="sticky bottom-0">
        {/* player */}
        <Player />
      </div>
    </div>
  )
}

