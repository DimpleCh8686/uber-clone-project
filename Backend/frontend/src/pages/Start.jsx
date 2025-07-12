import React from 'react'
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://www.pymnts.com/wp-content/uploads/2023/08/Uber-Cover-Genius.jpg?w=768)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'> 
        <img className='w-16 ml-8' src="https://marketing.dcassetcdn.com/blog/2018/September/Uber-Wordmark/DI_Uber-Wordmark_Banner_828x300.jpg" alt="Uber Logo"/>
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-[30px] font-semibold'> Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start