import Header from '@/components/Header';
import React from 'react'

type Props = {}

const Setting = (props: Props) => {
    const userSetting  = {
     username:"johndoe",
     email:"john.doe@example.com",
     teamName:"Development Team",
     roleName:"Developer"
    }

    const labelStyle = "block text-sm font-medium dark:text-white";
    const textStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white"
  return (
    <div className='p-8'>
      <Header name='Settings'/>
      <div className=' space-y-4'>
         <div>
             <label className={labelStyle}>UserName</label>
             <div className={textStyles}>{userSetting.username}</div>
         </div>
         <div>
             <label className={labelStyle}>Email</label>
             <div className={textStyles}>{userSetting.email}</div>
         </div>
         <div>
             <label className={labelStyle}>Team</label>
             <div className={textStyles}>{userSetting.teamName}</div>
         </div>
         <div>
             <label className={labelStyle}>Role</label>
             <div className={textStyles}>{userSetting.roleName}</div>
         </div>
      </div>
    </div>
  )
}

export default Setting