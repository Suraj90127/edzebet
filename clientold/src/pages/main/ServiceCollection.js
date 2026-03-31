import React, { useEffect } from 'react';
import ServerBg from "../../assets/customerBg.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import LiveChatImg from "../../assets/liveChat.png";
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ServiceCollection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

 


  function handle(){
    navigate(""); // Navigate to the target route
// Reload the page after navigating
  }

  return (
    <>
      <div className='blue-linear p-1 py-3 sticky top-0'>
        <div className="container-section flex items-center relative">
          <button className='absolute'>
            <Link to={"/main/CustomerService"}>
              <IoIosArrowBack className='text-xl' />
            </Link>
          </button>
          <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>
            Customer Service
          </h1>
        </div>
      </div>

      <div>
        <img src={ServerBg} alt="" />
      </div>

      <div className="container-section">
        <Link className='flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg' to="/main/CustomerService/ServiceCollection/problem">
          <div className='flex items-center'>
            <img src={LiveChatImg} className='w-8' alt="" />
            <span className='text-base gray-50 ms-2 font-sans font-medium'>
              Self Service Recharge & Withdrawal problem
            </span>
          </div>
          <div className='flex items-center'>
            <MdOutlineArrowForwardIos className='text-lg gay-100' />
          </div>
        </Link>

        <Link className='flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg' to={userInfo?.telegram}>
          <div className='flex items-center'>
            <img src={LiveChatImg} className='w-8' alt="" />
            <span className='text-base gray-50 ms-2 font-sans font-medium'>
              Other Problem
            </span>
          </div>
          <div className='flex items-center'>
            <MdOutlineArrowForwardIos className='text-lg gay-100' />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ServiceCollection;
