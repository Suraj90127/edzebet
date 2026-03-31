import React from 'react'
import { slotsData } from "./AllgameData"
const Slots = () => {
    return (
        <>

            <h4 className='border-after mt-2 color-l'>
              Slots
            </h4>
            <div className="grid grid-cols-12 gap-3">
                {slotsData.map((items, i) => (
                    <div className="col-span-4 bg-home-lg rounded-lg" key={i}>
                        <img src={items} alt="" loading="lazy" className="w-full rounded-lg h-[140px]" />
                    </div>
                ))}
            </div>


        </>
    )
}

export default Slots
