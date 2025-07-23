'use client'

import { saveNotificationChanges } from '@/lib/actions/saveNotificationChanges';
import { requestNotificationPermission } from '@/lib/firebase/requestNotificationPermission';
import { SettingsForm, View } from '@/types';
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Image from 'next/image';
import { useSettings } from '@/context/SettingsContext';


type SettingProps = {
  setView: (view: View) => void
}

const Settings = ({ setView } : SettingProps) => {
  const router = useRouter()
  const { state, updateState } = useSettings();

  // Initialize React Hook Form(RHF)
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SettingsForm>({
    defaultValues: {
      checkInTime: '',
      checkOutTime: '',
      notificationsEnabled: true,
    }
  });

  // Function to handle save notification settings
  const onSubmit = async (data: SettingsForm) => {
    try {
      // Ask for FCM permission + token
      const tokens = await requestNotificationPermission();

      if (!tokens || !tokens.newToken) {
        toast.error("Notifications permission denied or token unavailable.");
        return;
      }

      // Merge clean form data with FCM tokens
      const payload = {
        ...data,
        checkInTime: data.checkInTime || null,
        checkOutTime: data.checkOutTime || null,
        fcm_token: tokens.newToken,
        old_token: tokens.oldToken || null,
      }

      // Save to DB
      const res = await saveNotificationChanges(payload);

      if (!res.success) {
        toast.error(res.message)
        return
      }

      // Update local state (from context)
      updateState("checkIn", data.checkInTime);
      updateState("checkOut", data.checkOutTime);
      updateState("notificationEnabled", data.notificationsEnabled)

      toast.success(res.message)
    } catch(error) {
      console.error(error)
      toast.error('Something went wrong')
    } 
  }

  // Navigate to home page
  const goHome = () => {
    setView("home")
    router.replace("/")
  }

  return (
    <div>
      <div className='flex items-center gap-8 mb-4 mt-4 max-w-dvh'>
        <ArrowLeft onClick={goHome} className='hover:cursor-pointer text-gray-300 hover:text-gray-100 rounded-full'/>
        <p className='text-xl font-semibold'>Notification Settings</p>
      </div>

      <div className='flex items-center gap-6 justify-between mt-10 px-8'>
        <div className='max-w-60'>
          <p className='text-green-600 font-bold text-2xl mb-2'>Smart Track</p>
          <p className='text-gray-500 text-sm'>Set your time and forget about forgetting 😂.</p>
        </div>
        <div className="relative flex rounded-full">
                <div className="flex m-auto items-center size-24 z-10 justify-center bg-green-600 rounded-full">
                  <Image priority src={"/assets/icons/logo2.svg"} alt="logo" width={200} height={200} className="w-16 sm"/> 
                </div>
          </div>
      </div>

      <div className='flex mt-24'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10 m-auto'>
          <div className='flex flex-col'>
            <label htmlFor="checkInTime" className="text-sm text-gray-400">Check-in time</label>
            <input 
              type='time' 
              id='checkInTime' 
              {...register("checkInTime", { required: "Please set a check-in time"})}
              className="appearance-none border-b rounded-md bg-gray-700 border-gray-700 text-white px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-300"
            />
            {errors.checkInTime && (
              <span className="text-red-500 text-xs mt-1">
                {errors.checkInTime.message}
              </span>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="checkOutTimet" className="text-sm text-gray-400">Check-out time</label>
            <input 
              type='time' 
              id='checkOutTime' 
              {...register("checkOutTime", { required: "Please set a check-out time"})}
              className="appearance-none border-b rounded-md bg-gray-700 border-gray-700 text-white px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-300"
            />
            {errors.checkOutTime && (
              <span className="text-red-500 text-xs mt-1">
                {errors.checkOutTime.message}
              </span>
            )}
          </div>

          <div className='flex gap-2 items-center'>
            <label htmlFor='notificationsEnabled' className='text-gray-300'>Enable notifications</label>
            <input 
              type='checkbox' 
              id='notificationsEnabled'
              {...register("notificationsEnabled")}
              className='accent-green-600 w-4 h-4 cursor-pointer'
            />            
          </div>   
          <button 
            type='submit' 
            disabled={isSubmitting} 
            className={`flex justify-center px-8 min-w-fit max-w-54 py-[10px] ${isSubmitting ? 'cursor-not-allowed active:scale-100' : ''}`}
          >
            {isSubmitting ? <p className='flex items-center text-center gap-3'><Loader2 className='animate-spin w-4'/>Saving changes...</p> : 'Save changes'}
          </button>       
        </form>
      </div>
    </div>
  )
}

export default Settings