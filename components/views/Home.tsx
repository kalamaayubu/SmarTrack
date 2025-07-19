'use client'

import { checkUserAtSwahilipot } from "@/utils/isWithinRadius";
import { CheckCircle2, DoorClosed } from "lucide-react";
import { useEffect, useState } from "react";

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
    <div className='flex flex-col gap-4 mt-10 p-4'>
        {/* Location status */}
        <div className="flex flex-col gap-2 m-auto text-center mb-10">
            {isInSwahilipot == null && "Checking Location..."}
            {isInSwahilipot ? (
                <>
                    <CheckCircle2 className="text-green-600 m-auto"/>
                    <p className={` text-xl text-green-600`}>You&rsquo;re in Swahilipot</p>
                </>
            ) : (
                <>
                    <DoorClosed  className="text-red-600 m-auto"/>
                    <p className={` text-xl text-red-600`}>You&rsquo;re not in Swahilipot</p>
                </>
            )}
        </div>

        <button 
            onClick={goToScanQR}
            disabled={!isInSwahilipot} 
            className={`${!isInSwahilipot ? 'cursor-not-allowed bg-green-600 hover:bg-green-600 active:scale-100 opacity-60' : ''} mb-8 w-[80%] m-auto`}
        >
            Scan Code
        </button>

        {/* Notification setting status */}
        <p onClick={goToSettigs} className="text-gray-400 mt-10 text-center hover:cursor-pointer hover:text-gray-500 active:scale-95 transition-all duration-300">{`Notifications are disabled`}</p>
    </div>
  )
}

export default Home