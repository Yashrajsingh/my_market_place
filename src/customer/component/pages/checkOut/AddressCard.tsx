import { Radio } from '@mui/material'
import React from 'react'
import { Address } from '../../../../types/UserTypes'

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
}

const AddressCard = ({ address, selected, onSelect }: AddressCardProps) => {

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border-2 rounded-xl shadow-sm p-4 transition-all duration-300 ${
        selected
          ? "border-violet-400 bg-violet-50/40 shadow-card"
          : "border-gray-200 hover:border-violet-300 hover:shadow-card"
      }`}
    >

      <div className='flex items-start gap-3'>
        <Radio
          checked={selected}
          onChange={onSelect}
          value=""
          name='radio-button'
        />
      </div>

      <div className='ml-14 -mt-10 space-y-2'>
        <h1 className='text-lg font-semibold text-gray-800'>{address.name}</h1>

        <p className='text-gray-600 leading-relaxed'>
          {address.locality}, {address.address}, {address.city}, {address.state} - {address.pinCode}
        </p>

        <p className='text-gray-700'>
          <strong>
            Mobile :
          </strong> {address.mobile}
        </p>
      </div>

    </div>
  )
}

export default AddressCard
