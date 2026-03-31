import React from 'react'
import img2 from '../assets/logo.png'
const img1 = 'https://i.ibb.co/vLGD1Yy/Polish-1.png'

const MainLoader = () => {
  return (
    <div className="bg-[--bg-nav] fixed z-[999] w-[22.7rem] top-0 bottom-0 flex flex-col gap-5 items-center justify-center h-screen overflow-hidden p-0">
    <img src={img1} className=" h-auto w-[270px]" alt="bdgclub"  loading="lazy" />
    <h2 className="text-white font-bold arial text-[18px]">
      Withdraw fast, safe and stable
    </h2>
    <img src={img2} className="w-[200px] h-auto mt-[70px]" alt="logo" loading="lazy" />
  </div>
  )
}

export default MainLoader


