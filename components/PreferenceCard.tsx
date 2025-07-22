'use client'

import { PreferenceCardProps } from "@/types"
import { LucideTimerReset } from "lucide-react"

const PreferenceCard = ({ icon, title, value }: PreferenceCardProps) => {
  return (
    <div className="border flex p-2 shadow-green-600 hover:shadow transition-shadow duration-300 cursor-pointer flex-col text-gray-500 border-gray-800 rounded-md w-[120px]">
        <LucideTimerReset className="mb-2 text-white w-5"/>
        <p className="text-sm font-semibold">{ title }</p>
        <p className="text-gray-300">{ value}</p>
    </div>
  )
}

export default PreferenceCard