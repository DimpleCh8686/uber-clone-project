import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = { width: '100%', height: '100%' }

const mapOptions = {
  draggable: true,
  scrollwheel: true,
  zoomControl: true,
  gestureHandling: 'greedy',
  mapTypeControl: false,
  streetViewControl: false
}

export default function LiveTracking() {
  const [currentPosition, setCurrentPosition] = useState({ lat: -3.745, lng: -38.523 })
  const mapRef = useRef(null)

  const onLoad = map => {
    mapRef.current = map
    map.panTo(currentPosition)
  }

  useEffect(() => {
    const geoOpts = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude }
        setCurrentPosition(pos)
        mapRef.current?.panTo(pos) 
      },
      console.error,
      geoOpts
    )

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude }
        setCurrentPosition(pos)
        mapRef.current?.panTo(pos) 
      },
      console.error,
      geoOpts
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 0 }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
          onLoad={onLoad}
          options={mapOptions}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
