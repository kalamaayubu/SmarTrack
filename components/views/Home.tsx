'use client'

import { CheckCircle2, DoorClosed } from "lucide-react";

type HomeProps = {
    location: string;
    setView: (view: string) => void
}


const Home = ({ location, setView } : HomeProps ) => {
  const goToSettigs = () => {
    setView("settings")
  }

  return (
    <div className='flex flex-col gap-4  mt-10 p-4'>
        {/* Location status */}
        <div className="flex flex-col gap-2 m-auto text-center mb-10">
            {location == "You're in Swahilipot" ? (
                <>
                    <CheckCircle2 className="text-green-600 m-auto"/>
                    <p className={` text-xl text-green-600`}>You're in Swahilipot</p>
                </>
            ) : (
                <>
                    <DoorClosed  className="text-red-600 m-auto"/>
                    <p className={` text-xl text-red-600`}>You're not in Swahilipot</p>
                </>
            )}
        </div>

        <button className="mb-8 w-[80%] m-auto">
            Scan Code
        </button>

        {/* Notification setting status */}
        <p onClick={goToSettigs} className="text-gray-400 mt-10 text-center hover:cursor-pointer hover:text-gray-500 active:scale-95 transition-all duration-300">{`Notifications are disabled`}</p>
    </div>
  )
}

export default Home