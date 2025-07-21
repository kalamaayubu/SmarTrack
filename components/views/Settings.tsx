'use client'

import { saveNotificationChanges } from '@/lib/actions/saveNotificationChanges';
import { requestNotificationPermission } from '@/lib/firebase/requestNotificationPermission';
import { SettingsForm } from '@/types';
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Header from '../Header';

type View = "home" | "scanning" | "settings";

type SettingProps = {
  setView: (view: View) => void
}

const Settings = ({ setView } : SettingProps) => {

  const router = useRouter()

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

      <div className='flex items-center justify-between mr-2 mt-10 px-12'>
        <div className='ml-2'>
          <p className='text-green-600 font-bold text-2xl mb-2'>SmarTrack</p>
          <p className='text-gray-500 text-sm'>Set your prefered timing</p>
        </div>
        <div className="relative flex rounded-full">
              <div className="absolute bg-green-400 rounded-full animate animate-ping z-0 size-10 top-11 left-1/2 -translate-x-1/2"/>
              <Header/>
          </div>
      </div>

      <div className='mt-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10 ml-32'>
          <div className='flex flex-col'>
            <label htmlFor="checkInTime" className="text-sm text-gray-400">Check-in Time</label>
            <input 
              type='time' 
              id='checkInTime' 
              {...register("checkInTime", { required: "Please set a check-in time"})}
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-300"
            />
            {errors.checkInTime && (
              <span className="text-red-500 text-xs mt-1">
                {errors.checkInTime.message}
              </span>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="checkOutTimet" className="text-sm text-gray-400">Check-out Time</label>
            <input 
              type='time' 
              id='checkOutTime' 
              {...register("checkOutTime")}
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-300"
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