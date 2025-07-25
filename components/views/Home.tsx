'use client'

import { checkUserAtSwahilipot } from "@/utils/isWithinRadius";
import { Bell, BellOff, CheckCircle2, DoorClosed, Loader2, LogOutIcon, LucideTimerOff, LucideTimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import PreferenceCard from "../PreferenceCard";
import { View } from "@/types";
import { useSettings } from "@/context/SettingsContext";


type HomeProps = {
    setView: (view: View) => void
}

const Home = ({ setView } : HomeProps ) => {
    const [isInSwahilipot, setIsInSwahilipot] = useState<boolean | null>(null);
    const { state, updateState } = useSettings()

  // Check location when component mounts
  useEffect(() => {
    checkUserAtSwahilipot().then((result) => setIsInSwahilipot(result))
  }, [])

  const goToSettigs = () => setView("settings")
  const goToScanQR = () => setView("scanning")

  return (
    <div className="">
        <div className="relative flex rounded-full mt-20">
            <div className={`absolute bg-green-400 rounded-full ${isInSwahilipot == true ? "" : ( isInSwahilipot == false ? "" : 'animate-ping')} z-0 size-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}/>
            <div className="flex m-auto items-center size-32 z-10 justify-center bg-green-600 rounded-full">
                <Image priority src={"/assets/icons/logo2.svg"} alt="logo" width={200} height={200} className="w-24"/> 
            </div>
        </div>
        <div className='flex flex-col mt-10 p-4'>
            {/* Location status */}
            <div className="flex flex-col gap-[2px] m-auto text-center mb-4" aria-live="polite">
                {isInSwahilipot === null ? (
                    <p className="text-gray-300 animate-pulse text-xl">Checking your location...</p>
                ) : (

                    isInSwahilipot ? (
                        <>
                            <CheckCircle2 className="text-green-600 m-auto"/>
                            <p className={` text-xl text-green-600`}>You&rsquo;re within Swahilipot</p>
                        </>
                    ) : (
                        <>
                            <DoorClosed  className="text-red-600 m-auto"/>
                            <p className={` text-xl text-red-600`}>You&rsquo;re not within Swahilipot</p>
                        </>
                    )
                )}
            </div>

            <button 
                onClick={goToScanQR}
                disabled={isInSwahilipot !== true} 
                className={`${!isInSwahilipot ? 'cursor-not-allowed bg-green-600 hover:bg-green-600 active:scale-100 opacity-60' : ''} w-[70%] m-auto`}
            >
                {isInSwahilipot == true ? 
                'Scan Code' 
                : (
                    isInSwahilipot == false ? (
                        <p className="">Can not scan code</p>
                    ) : (
                        <Loader2 className="w-5 animate-spin m-auto"/>
                    )
                )}
            </button>

            <div className="flex gap-4 m-auto justify-center w-[80%] max-w-80 mt-16 mb-6">
                <PreferenceCard 
                    icon={LucideTimerReset}
                    title="Check in time"
                    value={state.checkIn}
                />

                <PreferenceCard 
                    icon={LogOutIcon}
                    title="Check out time"
                    value={state.checkOut}
                />
            </div>

            {/* Notification setting status */}
            <p onClick={goToSettigs} className="text-gray-500 hover:cursor-pointer w-fit m-auto hover:text-gray-300 active:scale-95 transition-all duration-300">
                {state.notificationsEnabled ? (
                    <p className="flex gap-2 items-center justify-center"><Bell className="w-4"/> Notifications enabled </p>
                    ) : (
                         <p className="flex gap-2 items-center justify-center"><BellOff className="w-4"/> Notifications disabled</p> 
                    )
                }
            </p>
        </div>
    </div>
  )
}

export default Home