import React from 'react'
import cricket from "../../assets/bdgimg/cricket.png"
import sport from "../../assets/bdgimg/sports.png"
import { IoIosBaseball } from 'react-icons/io'
import { BiFootball } from 'react-icons/bi'
import Sport1 from "../../assets/bdgimg/sports1.png"
import Sport2 from "../../assets/bdgimg/sports2.png"


const Sports = () => {
    return (
        <>
            <h4 className='border-after mt-2 color-l'>
                Sports
            </h4>

            <div className="grid grid-cols-12 gap-3 mt-3">
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                         <img src={Sport1} alt="" className="w-8" />
                           <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>
                            Sports</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">WICKETS Sports</p>
                    </div>
                    <img src={cricket} alt="" className="w-36 ml-2" />
                </div>
                <div className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div className='ms-1'>
                    <img src={Sport2} alt="" className="w-8" />
                        <p className="text-sm   black-2  font-bold flex">
                            <svg height={15} className='mt-1' width={6} xmlns="http://www.w3.org/2000/svg">
                                <line y2={100} style={{ stroke: '#000', strokeWidth: 6 }} />
                            </svg>

                            Sports</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold pb-2">Saba Sports</p>
                    </div>
                    <img src={sport} alt="" className="w-36 ml-2" />
                </div>



            </div>
        </>
    )
}

export default Sports
