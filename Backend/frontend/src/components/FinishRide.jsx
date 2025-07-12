import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getAddressParts = (fullAddress = '') => {
  const parts = fullAddress.split(',');
  const title = parts[0] || '';
  const subtitle = parts.slice(1).join(',').trim();
  return { title, subtitle };
};

const FinishRide = ({ ride, setFinishRidePanel, fetchCaptainProfile }) => {
  const navigate = useNavigate();

  const pickupParts = getAddressParts(ride?.pickup);
  const destinationParts = getAddressParts(ride?.destination);

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        if (typeof fetchCaptainProfile === 'function') {
          await fetchCaptainProfile();
        }

        setFinishRidePanel(false);
        navigate('/captain-home');
      } else {
        alert('Something went wrong. Try again.');
      }
    } catch (error) {
      console.error('Error finishing ride:', error);
      alert(error?.response?.data?.message || 'Error finishing ride.');
    }
  }

  return (
    <div>
      <button
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => setFinishRidePanel(false)}
        aria-label='Close finish ride panel'
      >
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </button>

      <h3 className='text-2xl font-semibold mb-5'>Finish this ride!</h3>

      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-10 rounded-full object-cover'
            src='https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?semt=ais_hybrid'
            alt='User'
          />
          <h2 className='text-lg font-medium capitalize'>
            {ride?.user?.fullname?.firstname || 'User'}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>
          {ride?.distance ? `${ride.distance} KM` : '...'}
        </h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='ri-map-pin-user-fill'></i>
            <div>
              <h3 className='text-lg font-medium ml-1'>{pickupParts.title}</h3>
              <p className='text-sm text-gray-600 ml-1'>{pickupParts.subtitle}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>{destinationParts.title}</h3>
              <p className='text-sm text-gray-600'>{destinationParts.subtitle}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-money-rupee-circle-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare || 0}</h3>
              <p className='text-sm text-gray-600'>Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-10 w-full'>
          <button
            onClick={endRide}
            className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
