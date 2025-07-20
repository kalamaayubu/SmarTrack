'use client'

import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type View = "home" | "scanning" | "settings";

type SettingProps = {
  setView: (view: View) => void
}

const Settings = ({ setView } : SettingProps) => {
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const goHome = () => {
    setView("home")
    router.refresh()
  }

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)

    // Function to save notification settings

  }
  return (
    <div>
      <div className='flex items-center mb-4 mt-4 max-w-dvh'>
        <ArrowLeft onClick={goHome} className='hover:cursor-pointer text-gray-700 hover:text-gray-950 rounded-full'/>
        <p className='m-auto text-xl font-semibold'>Notification Settings</p>
      </div>

      <div className='ml-8 mt-10'>
        <form onSubmit={handleSaveChanges} className='flex flex-col space-y-10 items-center'>
          <div className='flex flex-col'>
            <label htmlFor="check-in" className="text-sm text-gray-600">Check-in Time</label>
            <input 
              type='time' 
              id='check-in' 
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-900"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="check-out" className="text-sm text-gray-600">Check-out Time</label>
            <input 
              type='time' 
              id='check-out' 
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-900"
            />
          </div>

          <div className='flex gap-2 items-center'>
            <p>Enable notifications</p>
              <input type='checkbox' className='accent-green-600 w-4 h-4'/>            
          </div>   
          <button type='submit' disabled={isSaving} className='flex m-auto px-8 py-[10px]'>
            {isSaving ? <p className='flex items-center gap-3'><Loader2 className='animate-spin w-4'/>Saving changes...</p> : 'Save changes'}
          </button>       
        </form>
      </div>
    </div>
  )
}

export default Settings