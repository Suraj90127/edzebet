import React from 'react'
import rummy1 from "../../assets/bdgimg/rummy1.png"
import rummy2 from "../../assets/bdgimg/rummy2.png"
import { IoIosBaseball } from 'react-icons/io'
import { BiFootball } from 'react-icons/bi'

import rummys2 from "../../assets/bdgimg/rummys2.png"
import rummys1 from "../../assets/bdgimg/rummys1.png"


const Rummy = () => {
    return (
        <>
            <h4 className='border-after mt-2 color-l'>
                PVC
            </h4>

            <div className="grid grid-cols-12 gap-3 mt-3">
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={rummys1} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>
                            rummy</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">365</p>
                    </div>
                    <img src={rummy1} alt="" className="w-28 ml-2" />
                </div>
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={rummys2} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>

                            rummy</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">V8</p>
                    </div>
                    <img src={rummy2} alt="" className="w-28 ml-2" />
                </div>
            
            </div>
        </>
    )
}

export default Rummy
