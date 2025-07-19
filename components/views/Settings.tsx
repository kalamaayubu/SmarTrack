import { ArrowLeft } from 'lucide-react'

type View = "home" | "scanning" | "settings";

type SettingProps = {
  setView: (view: View) => void
}

const Settings = ({ setView } : SettingProps) => {
  const goHome = () => {
    setView("home")
  }
  return (
    <div>
      <div className='flex items-center mb-4 mt-4 max-w-dvh bg-red-600'>
        <ArrowLeft onClick={goHome} className='hover:cursor-pointer text-gray-700 hover:text-gray-950 rounded-full'/>
        <p className='m-auto text-xl font-semibold'>Notification Settings</p>
      </div>

      <div className='ml-8 mt-20'>
        <div className='flex flex-col gap-20 items-center'>

          <div className='flex flex-col gap-1'>
            <label htmlFor="check-in" className="text-sm text-gray-600">Check-in Time</label>
            <input 
              type='time' 
              id='check-in' 
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-900"
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="check-out" className="text-sm text-gray-600">Check-out Time</label>
            <input 
              type='time' 
              id='check-out' 
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-900"
            />
          </div>

          <div>
            <p>Enable notifications</p>
          </div>          
        </div>
      </div>
      <button className='flex m-auto px-8 py-[10px] mt-10'>Save changes</button>
    </div>
  )
}

export default Settings