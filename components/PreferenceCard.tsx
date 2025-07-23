'use client'

import { PreferenceCardProps } from "@/types"
import React from "react"

const PreferenceCard = ({ icon, title, value }: PreferenceCardProps) => {
  const Icon = icon;

  return (
    <div className="border flex bg-[#171717a6] p-2 shadow-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer flex-col text-gray-500 border-gray-800 rounded-md w-[120px]">
        <Icon className="w-5 h-5 text-white mb-[10px]" />
        <p className="text-sm font-semibold">{ title }</p>
        <p className="text-gray-300">{ value}</p>
    </div>
  )
}

export default PreferenceCard