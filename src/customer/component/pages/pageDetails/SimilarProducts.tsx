import React from 'react'
import SimilarProductCards from './SimilarProductCards'

const SimilarProducts = () => {
  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8'>
      {[1,1,1,1,1,1,1].map((item) => <SimilarProductCards/>)}
    </div>
  )
}

export default SimilarProducts
