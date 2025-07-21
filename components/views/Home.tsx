'use client'

import { checkUserAtSwahilipot } from "@/utils/isWithinRadius";
import { CheckCircle2, DoorClosed } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type View = "home" | "scanning" | "settings";

type HomeProps = {
    setView: (view: View) => void
}


const Home = ({ setView } : HomeProps ) => {
    const [isInSwahilipot, setIsInSwahilipot] = useState<boolean | null>(null);

  useEffect(() => {
    // Check location when component mounts
    checkUserAtSwahilipot().then((result) => setIsInSwahilipot(result))
  }, [])

  const goToSettigs = () => setView("settings")
  const goToScanQR = () => setView("scanning")

  return (
    <div className="">
        <div className="relative flex rounded-full mt-20">
            <div className={`absolute bg-green-400 rounded-full ${isInSwahilipot ? "" : 'animate-ping'} z-0 size-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}/>
            <div className="flex m-auto items-center size-32 z-10 justify-center bg-green-600 rounded-full">
                <Image priority src={"/assets/icons/logo2.svg"} alt="logo" width={200} height={200} className="w-24"/> 
            </div>
        </div>
        <div className='flex flex-col gap-4 mt-10 p-4'>
            {/* Location status */}
            <div className="flex flex-col gap-2 m-auto text-center mb-10">
                {isInSwahilipot === null ? (
                    <p className="text-gray-500">Checking location...</p>
                ) : (

                    isInSwahilipot ? (
                        <>
                            <CheckCircle2 className="text-green-600 m-auto"/>
                            <p className={` text-xl text-green-600`}>You&rsquo;re in Swahilipot</p>
                        </>
                    ) : (
                        <>
                            <DoorClosed  className="text-red-600 m-auto"/>
                            <p className={` text-xl text-red-600`}>You&rsquo;re not in Swahilipot</p>
                        </>
                    )
                )}
            </div>

            <button 
                onClick={goToScanQR}
                disabled={isInSwahilipot !== true} 
                className={`${!isInSwahilipot ? 'cursor-not-allowed bg-green-600 hover:bg-green-600 active:scale-100 opacity-60' : ''} mb-8 w-[80%] m-auto`}
            >
                {isInSwahilipot !== true ? <p className="animate-pulse">Checking location...</p> : 'Scan Code'}
            </button>

            {/* Notification setting status */}
            <p onClick={goToSettigs} className="text-gray-400 mt-10 text-center hover:cursor-pointer hover:text-gray-300 active:scale-95 transition-all duration-300">{`Notifications are disabled`}</p>
        </div>
    </div>
  )
}

export default Home