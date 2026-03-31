import React, { useState, useEffect, useRef, Fragment } from 'react'
import "./lottery.css"
import { IoIosArrowBack } from 'react-icons/io';

import { useLocation, useNavigate } from "react-router-dom";
import WinningInformation from '../WinningInformation';
import { CasinoGameData} from '../ImgData';


const Casino = () => {
  const location = useLocation()
  const navigate = useNavigate()



  const allImages = CasinoGameData.reduce((acc, curr) => {
    return acc.concat(Object.values(curr));
  }, []);

  return (
    <>
      <div className="container-section">
        <div className="lottery--page-section">
          <button className='rounded-3xl border-2 p-1 mt-2 px-3' onClick={() => navigate(`/`, {
            state: location.pathname,
          })}><IoIosArrowBack /></button>
          <div >
                     <div className="grid grid-cols-12 gap-3 mt-3">

              {allImages.map((img, index) => (
                <div className="col-span-4" key={index}>
                  <img src={img} alt={`Image ${index + 1}`} className="w-full h-[150px]" />
                </div>
              ))}

            </div>
          </div>
          {/* winning information */}


          <WinningInformation />
        </div>
      </div>
    </>
  )
}

export default Casino

