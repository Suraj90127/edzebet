import React from 'react'
import {platformData,fishingData} from "./AllgameData"
const Fishing = () => {
  return (
    <>
    <div container-section mt-5>

    
    <h4 className='border-after mt-2 color-l'>
        Fishing
      </h4>
      <div className="grid grid-cols-12 gap-3">
                {fishingData.map((items, i) => (
                  <div className="col-span-4 bg-home-lg rounded-lg" key={i}>
                    <img src={items} alt="" loading="lazy" className="w-full rounded-lg p-[1px] h-[110px]" />
                  </div>
                ))}
              </div>
              </div>
               
    </>
  )
}

export default Fishing
