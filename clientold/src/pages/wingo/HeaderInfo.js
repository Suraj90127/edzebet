import React, { useState } from 'react'
import { BsFire } from 'react-icons/bs'
import { FaVolumeUp } from 'react-icons/fa'
import RefereshImg from "../../assets/refresh.png"
import Wallet from "../../assets/wallet.png"
import { useNavigate } from 'react-router-dom'
import Marquee from "react-fast-marquee"
import Slider from 'react-slick'
import { RiVolumeUpFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const HeaderInfo = ({ money, handleRefersh }) => {
const {bannergetData}=useSelector((state)=>state.auth)

  
  const navigate = useNavigate()
  const notices = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 5000, // Time between scrolls (adjust as needed)
    verticalSwiping: true,
    arrows: false, // No arrows
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Smoother easing curve
    speed: 2000, // Transition duration (milliseconds)
  };
  
  return (
    <>
      <div className="blue-linear pb-24 rounded-b-[60px]">
        <div className="container-section pt-5">
          <div className="wallet-bg-section bg-color-l  pb-4 rounded-2xl  flex flex-col justify-center items-center w-full">
            <div className='flex items-center ms-2 mt-4 mb-1'>
              <h3 className="heaing-h3 text-lg font-bold text-black">₹{Number(money).toFixed(2)}</h3>
              <img src={RefereshImg} alt="" className='w-4 ms-3 mb-[0px] brightness-50' onClick={handleRefersh} />
            </div>
            <div className='flex items-center'>
              <img src={Wallet} alt="" className='w-4 mr-2 mb-[2px]' />
              <p className='fs-sm text-black'>Wallet balance</p>
            </div>
            <div className='flex w-full justify-around items-center mt-3'>
              <button className='
    text-base flex justify-center items-center px-6 py-1 border-none font-bold red-linear rounded-full
    ' onClick={() => navigate("/wallet/Withdraw")}>Withdraw</button>

              <button className=' text-base flex justify-center items-center px-6 py-1 border-none font-bold bgs-green rounded-full ' onClick={() => navigate("/wallet/Recharge")}>Deposit</button>

            </div>
          </div>


           {/* notice board */}
           <div className="banner-notice nav-bg mt-3  rounded-full flex items-center justify-between" >
            <RiVolumeUpFill className="text-xl color-l absolute" />

            <div className="slider-container h-10 ms-6 mr-3 overflow-hidden">
              <Slider {...notices} className='gray-100'>
                <div>
                  <h3 className="text-sm">
                    Welcome to the {bannergetData?.gameall?.name}!  Greetings, Gamers and Enthusiasts!  The {bannergetData?.gameall?.name} is more than just a platform for gaming.  We invite you to join us, you'll find a variety of games, promo, bonus, luxury gold awards, Register now and win.
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm">
                    If your deposit not receive, please send it directly to {bannergetData?.gameall?.name} Self-service Center {bannergetData?.gameall?.name} wait till already get process, do not send to another person and trust anyone claiming to represent {bannergetData?.gameall?.name}. Always verify our website authenticity through the official community channels. Your safety and trust is our prority.
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm">
                    Please be sure to always use our official website for playing the games with the following link, {bannergetData?.gameall?.name}. Please always check our official link to access our website and avoid scammers and phishing links
                  </h3>
                </div>

              </Slider>
            </div>


            <span className="float-end text-xl  relative mr-2" >
            <button className='flex items-center blue-linear p-1 rounded-md px-3'><BsFire className=" mr-1 fs-sm text-white" /> <span className=' font-semibold fs-sm'>Details</span></button>
     
              {/* <div className="ponter-event"></div> */}
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default HeaderInfo
