import React from 'react';

const getAddressParts = (fullAddress) => {
  const parts = fullAddress?.split(',') || [];
  const title = parts[0] || '';
  const subtitle = parts.slice(1).join(',').trim();
  return { title, subtitle };
};

const RidePopUp = (props) => {
  const pickupParts = getAddressParts(props.ride?.pickup);
  const destinationParts = getAddressParts(props.ride?.destination);

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setRidePopupPanel(false)
      }}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?semt=ais_hybrid" alt="" />
          <h2 className='text-lg font-medium'>
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>
          {props.ride?.distance ? `${props.ride.distance} KM` : '...'}
        </h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
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
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-5 w-full'>
          <button onClick={() => {
            props.setRidePopupPanel(false)
          }} className='mt-1 w-full bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>

          <button onClick={() => {
            props.setConfirmRidePopupPanel(true)
            props.confirmRide()
          }} className='bg-green-600 mt-3 w-full text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp;
