import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const getAddressParts = (fullAddress) => {
  const parts = fullAddress?.split(',') || [];
  const title = parts[0] || '';
  const subtitle = parts.slice(1).join(',').trim();
  return { title, subtitle };
};

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const destinationParts = getAddressParts(ride?.destination);

  useEffect(() => {
    if (socket) {
      socket.on("ride-ended", () => {
        navigate('/home');
      });

      return () => {
        socket.off("ride-ended");
      };
    }
  }, [socket, navigate]);

  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex justify-center items-center rounded-full'>
        <i className='text-lg font-medium ri-home-5-line'></i>
      </Link>

      <div className='h-1/2'>
        <LiveTracking />
      </div>

      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <img 
            className='h-12'
            src={
              ride?.captain?.vehicle?.vehicleType === 'car'
              ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_471,w_836/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png'
              : ride?.captain?.vehicle?.vehicleType === 'moto'
              ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'
              : ride?.captain?.vehicle?.vehicleType === 'auto'
              ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'
              : ''
            }
            alt={ride?.vehicleType}
          />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1 capitalize'>{ride?.captain?.vehicle?.plate}</h4>
            <p className='text-sm text-gray-600 capitalize'>{ride?.captain?.vehicle?.vehicleModel}</p>
          </div>
        </div>

        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>{destinationParts.title}</h3>
              <p className='text-sm text-gray-600'>{destinationParts.subtitle}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='text-lg ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
              <p className='text-sm text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
