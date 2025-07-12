import React from 'react';

const getAddressParts = (fullAddress) => {
  const parts = fullAddress?.split(',') || [];
  const title = parts[0] || '';
  const subtitle = parts.slice(1).join(',').trim();
  return { title, subtitle };
};

const WaitingForDriver = (props) => {
  const pickupParts = getAddressParts(props.ride?.pickup);
  const destinationParts = getAddressParts(props.ride?.destination);
  const { vehicleType } = props.ride?.captain?.vehicle || {};

  return (
    <div>
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => props.WaitingForDriver(false)}
      >
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img 
          className='h-20' src={
          vehicleType === 'car'
          ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_471,w_836/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png'
          : vehicleType === 'moto'
          ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'
          : vehicleType === 'auto'
          ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'
          : ''
          }
          alt={props.vehicleType}
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>
            {props.ride?.captain?.fullname?.firstname}
          </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1 capitalize'>
            {props.ride?.captain?.vehicle?.plate}
          </h4>
          <p className='text-sm text-gray-600 capitalize'>{props.ride?.captain?.vehicle?.vehicleModel}</p>

          <div className='mt-2 flex items-center gap-2 justify-end'>
            <i className='ri-shield-keyhole-line text-lg'></i>
            <span className='text-lg font-semibold'>OTP: {props.ride?.otp}</span>
          </div>
        </div>
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
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
