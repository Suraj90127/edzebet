import React from 'react'
import {platformData,OriginalData} from "./AllgameData"
const Original = () => {
  return (
    <>
  
    <h4 className='border-after mt-2 color-l'>
        Mini games
      </h4>
      <div className="grid grid-cols-12 gap-3">
                {OriginalData.map((items, i) => (
                  <div className="col-span-4 bg-home-lg rounded-lg" key={i}>
                    <img src={items} alt="" loading="lazy" className="w-full rounded-lg  h-[110px]" />
                  </div>
                ))}
              </div>
       </>
  )
}

export default Original
