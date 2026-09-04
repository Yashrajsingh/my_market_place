import React from 'react'

const UserAddressCard = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-transparent p-5 hover:shadow-card hover:border-violet-200 transition-all duration-300'>
      <div className='space-y-3'>
        <h1 className='text-lg font-bold text-gray-800'>
            Yashraj Singh
        </h1>

        <p className='text-gray-600 leading-relaxed'>
            AMbavadi Cohoke , Banglore , Banglore , Karnataka - 530068
        </p>

        <p className='text-gray-700'>
            <strong className='text-gray-900'>
                Mobile :
            </strong>
            {" "}9023379136
        </p>
      </div>
    </div>
  )
}

export default UserAddressCard;