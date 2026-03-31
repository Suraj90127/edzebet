import React from 'react'
import casino1 from "../../assets/bdgimg/casino1.png"
import casino2 from "../../assets/bdgimg/casino2.png"
import casino3 from "../../assets/bdgimg/casino3.png"
import casino4 from "../../assets/bdgimg/casino4.png"
import casino5 from "../../assets/bdgimg/casino5.png"
import { IoIosBaseball } from 'react-icons/io'
import { BiFootball } from 'react-icons/bi'

import CasinoIcon1 from "../../assets/bdgimg/casinosicon1.png"
import CasinoIcon2 from "../../assets/bdgimg/casinosicon2.png"
import CasinoIcon3 from "../../assets/bdgimg/casinosicon3.png"
import CasinoIcon4 from "../../assets/bdgimg/casinosicon4.png"
import CasinoIcon5 from "../../assets/bdgimg/casinosicon5.png"

const Casino = () => {
    return (
        <>
            <h4 className='border-after mt-2 color-l'>
                Casino
            </h4>

            <div className="grid grid-cols-12 gap-3 mt-3">
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                   
                    <img src={CasinoIcon1} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>
                            Casino</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">DG Casino</p>
                    </div>
                    <img src={casino1} alt="" className="w-36 ml-2" />
                </div>
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={CasinoIcon2} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>

                            Casino</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">EVO Casino</p>
                    </div>
                    <img src={casino2} alt="" className="w-36 ml-2" />
                </div>
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={CasinoIcon3} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>

                            Casino</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">AG Casino</p>
                    </div>
                    <img src={casino3} alt="" className="w-36 ml-2" />
                </div>
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={CasinoIcon4} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>

                            Casino</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">WM Casino</p>
                    </div>
                    <img src={casino4} alt="" className="w-36 ml-2" />
                </div>
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={CasinoIcon4} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>

                            Casino</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">Sexy Casino</p>
                    </div>
                    <img src={casino5} alt="" className="w-36 ml-2" />
                </div>
            </div>
        </>
    )
}

export default Casino
