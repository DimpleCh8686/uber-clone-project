import React from 'react'

const LocationSearchPanel = (props) => {

  //sample array of location

  const locations = [
    "24B, Near kapoor's Cafe, Sheryians Coding School, Bhopal",
    "29B, Near Jindal's Cafe, Sheryians Coding School, Bhopal",
    "27D, Near Gupta's Cafe, Sheryians Coding School, Bhopal",
    "28C, Near Choudhary's Cafe, Sheryians Coding School, Bhopal"
  ]

  return (
    <div>
      {/*This is just a sample Data */}
      {
        locations.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel
