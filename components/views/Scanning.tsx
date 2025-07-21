import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../Header";

type View = "home" | "scanning" | "settings";

type ScanningProps = {
    setView: (view: View) => void
}

const Scanning = ({setView} : ScanningProps) => {
    const [isScanning, setIsScanning] = useState<boolean>(true)
    const router = useRouter()
    const redirectURL = "https://docs.google.com/forms/d/e/1FAIpQLScTFlVr5pB9KrcqvnS9lya4IE87Oc2eiL53Vpm63zQIt9V7nw/viewform"

    useEffect(() => {
        setIsScanning(true)

        const timeout = setTimeout(() => {
            router.push(redirectURL)
        }, 150000)

        return () => clearTimeout(timeout)
    }, [redirectURL, router])

    const goHome = () => {
        setView("home")
        router.replace("/")
    } 
  return (
    <>
        <div className="relative flex rounded-full mt-20">
            {/* <div className="absolute bg-green-400 rounded-full animate animate-ping z-0 size-10 top-11 left-1/2 -translate-x-1/2"/> */}
            <Header/>
        </div>
        <div className="flex flex-col gap-4 items-center mt-10">
            <div className={`${isScanning ? "animate-pulse-fast border-green-600" : ""} border-4 bg-gray-100 relative w-64 h-64 border-gray-400 rounded-lg overflow-hidden`}>
                <div className="scan-overlay"/>
                <Image 
                    src={"/assets/qrcode.svg"} 
                    height={800} 
                    width={800} 
                    alt="qr-code"
                    priority
                    className="absolute"
                /> 
            </div>
            <button
                className="w-64 mt-4"
                onClick={goHome}
            >
                Cancel
            </button>
        </div>
    </>
  )
}

export default Scanning