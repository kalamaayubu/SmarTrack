'use client'

import { saveNotificationChanges } from '@/lib/actions/saveNotificationChanges';
import { SettingsForm } from '@/types';
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
      const cleanData = {
        ...data,
        checkInTime: data.checkInTime || null,
        checkOutTime: data.checkOutTime || null,
      };

      const res = await saveNotificationChanges(cleanData)

      if (!res.success) {
        toast.error('Failed to save changes. Please try again')
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
      <div className='flex items-center mb-4 mt-4 max-w-dvh'>
        <ArrowLeft onClick={goHome} className='hover:cursor-pointer text-gray-700 hover:text-gray-950 rounded-full'/>
        <p className='m-auto text-xl font-semibold'>Notification Settings</p>
      </div>

      <div className='ml-8 mt-10'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10 items-center'>
          <div className='flex flex-col'>
            <label htmlFor="checkInTime" className="text-sm text-gray-600">Check-in Time</label>
            <input 
              type='time' 
              id='checkInTime' 
              {...register("checkInTime", { required: "Please set a check-in time"})}
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-900"
            />
            {errors.checkInTime && (
              <span className="text-red-500 text-xs mt-1">
                {errors.checkInTime.message}
              </span>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="checkOutTimet" className="text-sm text-gray-600">Check-out Time</label>
            <input 
              type='time' 
              id='checkOutTime' 
              {...register("checkOutTime")}
              className="border-b border-gray-700 px-4 py-2 text-sm w-48 focus:outline-none focus:border-b-gray-900"
            />
            {errors.checkOutTime && (
              <span className="text-red-500 text-xs mt-1">
                {errors.checkOutTime.message}
              </span>
            )}
          </div>

          <div className='flex gap-2 items-center'>
            <label htmlFor='notificationsEnabled'>Enable notifications</label>
            <input 
              type='checkbox' 
              id='notificationsEnabled'
              {...register("notificationsEnabled")}
              className='accent-green-600 w-4 h-4'
            />            
          </div>   
          <button 
            type='submit' 
            disabled={isSubmitting} 
            className={`flex m-auto px-8 py-[10px] ${isSubmitting ? 'cursor-not-allowed active:scale-100' : ''}`}
          >
            {isSubmitting ? <p className='flex items-center gap-3'><Loader2 className='animate-spin w-4'/>Saving changes...</p> : 'Save changes'}
          </button>       
        </form>
      </div>
    </div>
  )
}

export default Settings