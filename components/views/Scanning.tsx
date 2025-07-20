import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        }, 1500)

        return () => clearTimeout(timeout)
    }, [redirectURL, router])

    const goHome = () => {
        setView("home")
        router.refresh()
    } 
  return (
    <div className="flex flex-col gap-4 items-center">
        <div className={`${isScanning ? "animate-pulse-fast border-gray-800" : ""} border-4 relative w-64 h-64 border-gray-400 rounded-lg overflow-hidden`}>
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
             className="max-w-60"
             onClick={goHome}
        >
            Cancel
        </button>
    </div>
  )
}

export default Scanning