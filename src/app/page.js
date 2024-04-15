import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
//import MenuButton from '../../pages/components/MenuButton';
import MenuButton from "../../components/MenuButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-6 md:p-24 bg-light-yellow">
      <div className="flex-row">
        <MenuButton/>
        <h1 className="font-bold p-4">Welcome to...</h1>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Head>
          <title >My Homepage</title>
        </Head>
        
        
        
        {/* <Link href="/products" className="underline">
          Go to Search Page
        </Link> */}
        <img src="/logosvg.svg" alt="Logo"/>
        <p>Easily lookup food products to make better choices for the environment, your health, and your pocket</p>
        {/* <p>while choosing to support independent producers and businesses.</p> */}
        
        <div>
          <img src="/lips.svg" alt="Lips" className="max-w-full max-h-full" style={{ padding: '10px' }} />
          {/* <p>Put your money where your mouth is</p>
          <p>No need to compromise your values while choosing the best ingredients.</p> */}
            {/* <p>Discover eco-friendly food options that benefit both the planet and your well-being.</p> */}
            <p>Put your money where your mouth is by supporting sustainable producers and businesses.</p>
            <p>No need to compromise your values while choosing the best ingredients.</p>
            {/* <p>Make ethical and healthy choices without breaking the bank.</p> */}

        </div>
      </div>
    </main>
  );
}
