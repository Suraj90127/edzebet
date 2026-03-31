import React from 'react'
import {platformData,popularData} from "./AllgameData"
const Popular = () => {
  return (
    <>
  
    <h4 className='border-after mt-2 color-l'>
        Platform recommendation
      </h4>
      <div className="grid grid-cols-12 gap-3">
                {platformData.map((items, i) => (
                  <div className="col-span-4 bg-home-lg rounded-lg" key={i}>
                    <img src={items} alt="" loading="lazy" className="w-full rounded-lg p-1 h-[120px]" />
                  </div>
                ))}
              </div>
              <h4 className='border-after mt-5 color-l'>
        Popular
      </h4>
      <div className="grid grid-cols-12 gap-3 mt-2">
                {popularData.map((items, i) => (
                  <div className="col-span-4 mb-2" key={i}>
                    <div className="bg-home-lg rounded-lg">
                    <img src={items.img} alt="" loading="lazy" className="w-full rounded-lg p-1 h-[120px]" />
                    </div>
                    <p className="fs-sm bg-blues black-2 mt-2 font-semibold rounded-s-md p-1 ps-2">odds of <span className="ms-2">{items.num}%</span></p>
                  </div>
                ))}
              </div>



      
    </>
  )
}

export default Popular
