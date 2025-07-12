import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const getAddressParts = (fullAddress) => {
  const parts = fullAddress?.split(',') || [];
  const title = parts[0] || '';
  const subtitle = parts.slice(1).join(',').trim();
  return { title, subtitle };
};

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate();

  const pickupParts = getAddressParts(props.ride?.pickup)
  const destinationParts = getAddressParts(props.ride?.destination)

  const submitHandler = async (e) => {
    e.preventDefault()

    try{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false)
      props.setRidePopupPanel(false)
      navigate('/captain-riding', { state: { ride: response.data } })
    }}catch (error) {
    console.error("Failed to start ride:", error);
    alert(error?.response?.data?.message || 'Failed to start ride');
  }
  }

  return (
    <div className="max-h-[100vh] overflow-y-auto p-4">
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setRidePopupPanel(false)
      }}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start!</h3>

      <div className='flex items-center mb4 justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?semt=ais_hybrid"
            alt=""
          />
          <h2 className='text-lg font-medium capitalize'>
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>
          {props.ride?.distance ? `${props.ride.distance} KM` : '...'}
        </h5>
      </div>

      <div className='flex gap-2 justify-between mb-4 flex-col items-center'>
        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='ri-map-pin-user-fill'></i>
            <div>
              <h3 className='text-lg font-medium ml-1'>{pickupParts.title}</h3>
              <p className='text-sm -mt-1 text-gray-600 ml-1'>{pickupParts.subtitle}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>{destinationParts.title}</h3>
              <p className='text-sm -mt-1 text-gray-600'>{destinationParts.subtitle}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-money-rupee-circle-line'></i>
            <div>
              <h3 className='text-lg mb-2 font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>

        </div>

        <div className='mt-6 overflow-y-auto max-h-[70vh] w-full px-3 '>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type='text'
              className='bg-white text-black px-6 py-4 font-mono text-lg rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              placeholder='Enter OTP'
            />

            <button
              type="submit"
              className='w-full mb-5 mt-4 text-lg bg-green-600 flex justify-center text-white font-semibold p-3 rounded-lg'>
              Confirm
            </button>

            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
              }}
              className='w-full mt-0 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
