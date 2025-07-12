import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain) return null;

  const firstname = captain?.fullname?.firstname || '';
  const lastname = captain?.fullname?.lastname || '';
  const vehicleModel = captain?.vehicle?.vehicleModel || '';
  const earnings = captain?.earnings || 0;
  const totalRides = captain?.noOfRides || 0;
  const hoursOnline = (captain?.hoursOnline || 0).toFixed(2);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img
            className='h-10 w-10 rounded-full object-cover'
            src="https://i.pinimg.com/236x/be/a3/49/bea3491915571d34a026753f4a872000.jpg"
            alt="Captain"
          />
          <div>
            <h2 className='text-lg font-medium capitalize'>{firstname + ' ' + lastname}</h2>
            <h4 className='text-sm font-medium text-gray-600 capitalize'>
              Vehicle Model: {vehicleModel}
            </h4>
          </div>
        </div>

        <div>
          <h4 className='text-xl font-semibold'>₹{earnings}</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>

      <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
          <h5 className='text-lg font-medium'>{hoursOnline}</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-steering-2-line'></i>
          <h5 className='text-lg font-medium'>{totalRides}</h5>
          <p className='text-sm text-gray-600'>Rides Completed</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-money-rupee-circle-line'></i>
          <h5 className='text-lg font-medium'>₹{earnings}</h5>
          <p className='text-sm text-gray-600'>Total Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
