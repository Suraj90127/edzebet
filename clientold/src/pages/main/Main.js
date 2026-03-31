import React, { useEffect, useState } from 'react'
import AvatarImg from "../../assets/avatar5.png"
import { AiFillExclamationCircle } from 'react-icons/ai';
import { PiChartBarFill, PiCopySimpleLight } from 'react-icons/pi'
import VIPIcon from "../../assets/vip.png"
import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router-dom'
import WalletIcon from "../../assets/walletIcon.png"

import VIPIcons from "../../assets/vipIcon.png"
import RefereshImg from "../../assets/refresh.png"
import VaulIcon from "../../assets/vaul.png"
import GameHistory from "../../assets/gamehistoryIcon.png"
import TransactionHistory from "../../assets/transactionIcon.png"
import DepositHistory from "../../assets/depositHistoryIcon.png"

import Settingicon from "../../assets/settingIcon.png"
import Feedbackicon from "../../assets/feedbackIcon.png"
import Notificationicon from "../../assets/notificationIcon.png"
import Customericon from "../../assets/customerserviceIcon.png"
import BeginnerGuideicon from "../../assets/beginnerguideIcon.png"
import Abouticon from "../../assets/aboutIcon.png"
import { IoIosArrowForward } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FaGift, FaGlobe } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import CopyCopmponent from '../../components/CopyCopmponent'
import { useDispatch, useSelector } from 'react-redux'
import { user_reset, userDetail } from '../../store/reducer/authReducer'
import Cookies from "js-cookie"
import { AvatarData, VIPImg } from './AvatarData'
import Loader from '../../components/Loader'
import TranslateComponent from './TranslateComponent'

const WithdrawHistory = "https://i.ibb.co/gtkHXGT/withdraw-Historyicon.png"
const DepositIcon= "https://i.ibb.co/MRwGGQB/deposit-Icon.png"
const WithdrawIcon = "https://i.ibb.co/PMj74ZV/withdraw-Icon.png"
const Main = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [refesh, setRefesh] = useState(false)
  const [copyPopup, setCopyPopup] = useState(false)

  const [showPopup, setShowPopup] = useState(false);



  const handleLogout = () => {
    Cookies.remove('auth');
    Cookies.remove('token');
    dispatch(userDetail())
    dispatch(user_reset())
    setShowPopup(false);
    if (!userInfo) {
      navigate('/login')
    }
  };



  const copyToClipCode = () => {
    navigator.clipboard.writeText(userInfo.id_user).then(() => {
      setCopyPopup(true);
      setTimeout(() => {
        setCopyPopup(false);
      }, 1500);

    }).catch(err => {
      console.error('Failed to copy the text: ', err);
    });
  }
  const handleRefesh = () => {
    dispatch(userDetail())
    setRefesh(true);
    // dispatch(user_reset())
    setTimeout(() => {
      setRefesh(false);
    }, 1500);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [])


  



  return (
    <Layout>
      <div className='blue-linear py-7 pb-32 rounded-b-[60px]'>
        <div className='container-section'>
          <div className='flex items-center'>
            <img src={AvatarData[userInfo?.userPhoto]} alt="" loading="lazy"  className='w-14 rounded-full h-14' onClick={() => navigate("/main/avatar")} />
            <div className='ms-2'>
              <h3 className="heaing-h3 flex items-center text-md">{userInfo?.name_user} <img src={VIPImg[userInfo?.vip_level]} alt="" loading="lazy"  className='w-10  ' /></h3>
              <div className='bg-yellow text-[12px] justify-between items-center px-2 rounded-full inline-flex'>
                <span>UID</span>
                <span className='px-3'>|</span>
                <span>{userInfo?.id_user}</span>
                <span className='ps-2' onClick={copyToClipCode}><PiCopySimpleLight /></span>
              </div>
              <p className='fs-sm mt-1'>Last login: {localStorage.getItem("currentDate")}</p>
            </div>
          </div>
        </div>
      </div>
      <TranslateComponent />

      {!userInfo && (
        <Loader />
      )}
      <div className="container-section relative mt-[-100px]">
        <div className="bg-color-l p-3 rounded-lg pb-3">
          <div>
            <p className='black-2 text-sm'>Total balance</p>
            <div className='flex items-center ms-2 mt-2'>
              <h3 className="heaing-h3 text-md text-black font-bold">₹{userInfo?.money_user ? Number(userInfo?.money_user).toFixed(2):0}</h3>
              <img src={RefereshImg} alt="" loading="lazy"  onClick={handleRefesh} className='w-5 ms-2 mb-[2px] brightness-50' />
            </div>
          </div>
        
          <div className='flex justify-between mt-4 mx-2'>
            <div onClick={() => navigate("/wallet")} className=' cursor-pointer flex flex-col items-center justify-center'>
              <img src={WalletIcon} alt="" loading="lazy"  className='w-6' />
              <p className='text-sm gray-50 text-center mt-2'>Wallet</p>
            </div>
            <div onClick={() => navigate("/wallet/Recharge")} className=' cursor-pointer flex flex-col items-center justify-center'>
              <img src={DepositIcon} alt="" loading="lazy"  className='w-7' />
              <p className='text-sm gray-50 text-center mt-2'>Deposit</p>
            </div>
            <div onClick={() => navigate("/wallet/Withdraw")} className='flex flex-col items-center justify-center  cursor-pointer'>
              <img src={WithdrawIcon} alt="" loading="lazy"  className='w-7' />
              <p className='text-sm gray-50 text-center mt-2'>Withdraw</p>
            </div>
            <div onClick={() => navigate("/vip")} className='flex flex-col items-center justify-center cursor-pointer'>
              <img src={VIPIcons} alt="" loading="lazy"  className='w-7' />
              <p className='text-sm gray-50 text-center mt-2'>VIP</p>
            </div>
          </div>
        </div>


        {/* <div className="blue-linear rounded-md flex items-center p-2 py-4 mt-4" onClick={() => navigate("/main/StrongBox")}>
          <img src={VaulIcon} alt="" loading="lazy"  className='w-10 h-10' />
          <div className='ms-2 '>
            <div className='flex justify-between items-center'>
              <h3 className="heading-h3 text-lg font-bold">Safe</h3>
              <div className='flex items-center justify-center'>
                <h3 className='bg-yellow text-sm justify-between items-center px-2 rounded-full inline-flex'>
                  ₹0.00
                </h3>
                <span>
                  <IoIosArrowForward className='gray-50 text-base' />
                </span>
              </div>
            </div>
            <p className="fs-sm gray-50">
              Daily rate 0.1%+VIP extra income safe, calculate every 1 minute
            </p>
          </div>
        </div> */}
        <div className="grid grid-cols-12 gap-2 mt-3">
          <div className="col-span-6 nav-bg p-3 py-4  rounded-md flex items-center" onClick={() => navigate("/main/BetRecors")}>
            <img src={GameHistory} alt="" loading="lazy"  className='w-7' />
            <div className='ms-2'>
              <h3 className="heaing-h3 gray-50 font-semibold leading-4 text-sm">Game History</h3>
              <p className='fs-sm black-2  leading-4'>My game history</p>
            </div>
          </div>
          <div className="col-span-6 nav-bg p-3 py-4 rounded-md flex items-center" onClick={() => navigate("/wallet/TransAction")}>
            <img src={TransactionHistory} alt="" loading="lazy"  className='w-7' />
            <div className='ms-2'>
              <h3 className="heaing-h3 gray-50 font-semibold leading-4 text-sm">Transaction</h3>
              <p className='fs-sm black-2 leading-4'>My transaction history</p>
            </div>
          </div>
          <div className="col-span-6 nav-bg p-3 py-4 rounded-md flex items-center" onClick={() => navigate("/wallet/RechargeHistory")}>
            <img src={DepositHistory} alt="" loading="lazy"  className='w-7' />
            <div className='ms-2'>
              <h3 className="heaing-h3 gray-50 font-semibold leading-4 text-sm">Deposit</h3>
              <p className='fs-sm black-2 leading-4'>My deposit history</p>
            </div>
          </div>
          <div className="col-span-6 nav-bg p-3 py-4 rounded-md flex items-center" onClick={() => navigate("/wallet/WithdrawalHistory")}>
            <img src={WithdrawHistory} alt="" loading="lazy"  className='w-7' />
            <div className='ms-2'>
              <h3 className="heaing-h3 gray-50 font-semibold leading-4">Withdraw</h3>
              <p className='fs-sm black-2 leading-4'>My withdraw history</p>
            </div>
          </div>
        </div>

      </div>


      {/* game notification section */}
      <div className="container-section">
        <ul className="bg-light mt-5 rounded-lg divide-y divide-slate-700 ..." >
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/home/Messages")}>
            <div className="flex items-center">
              <MdEmail className="text-2xl color-l" />
              <span className="text-sm gray-100 font-medium ml-2">Notification</span>
            </div>
            <div className="flex items-center">
              <h5 className="mr-2 bg-red-600  rounded-full w-5 h-5 flex items-center text-center justify-center  px-3">
                1
              </h5>
              <IoIosArrowForward className='text-sm font-thin black-2' />
            </div>
          </li>
          {/* <hr className="border"/> */}
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/main/RedeemGift")}>
            <div className="flex items-center">
              <FaGift className="text-2xl color-l" />
              <span className="text-sm  gray-100 font-medium ml-2">Gifts</span>
            </div>
            <div>
              <IoIosArrowForward className='text-sm font-thin black-2' />
            </div>
          </li>
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/main/GameStats")}>
            <div className="flex items-center">
              <PiChartBarFill className="text-2xl color-l" />
              <span className="text-sm  gray-100 font-medium ml-2">Games statistics</span>
            </div>
            <div>
              <IoIosArrowForward className='text-sm font-thin black-2' />
            </div>
          </li>
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/main/Language")}>
            <div className="flex items-center">
              <FaGlobe className="text-2xl color-l" />
              <span className="text-sm  gray-100 font-medium ml-2">Language</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm  gray-100 font-medium mr-1">English</span>
              <IoIosArrowForward className='text-sm font-thin black-2'
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="container-section mt-4">
        <div className="nav-bg p-3 rounded-lg pb-5">
          <h3 className="heading-h3 gray-50 font-medium mb-2 ">Service center</h3>
          <div className='grid grid-cols-12 gap-2'>

            <div className='col-span-4  flex flex-col justify-center items-center ms-2 mt-2' onClick={() => navigate("/main/SettingCenter")}>
              <img src={Settingicon} alt="" loading="lazy"  className='w-6 mb-2' />
              <p className='black-2 fs-sm'>Setting</p>
            </div>
            <div className='col-span-4  flex flex-col justify-center items-center ms-2 mt-2' onClick={() => navigate("/main/Feedback")}>
              <img src={Feedbackicon} alt="" loading="lazy"  className='w-6 mb-2' />
              <p className='black-2 fs-sm'>Feedback</p>
            </div>
            <div className='col-span-4  flex flex-col justify-center items-center ms-2 mt-2' onClick={() => navigate("/main/Notification")}>
              <img src={Notificationicon} alt="" loading="lazy"  className='w-6 mb-2' />
              <p className='black-2 fs-sm'>Notification</p>
            </div>
            <div className='col-span-4  flex flex-col justify-center items-center ms-2 mt-2' onClick={() => navigate("/main/CustomerService")}>
              <img src={Customericon} alt="" loading="lazy"  className='w-6 mb-2' />
              <p className='black-2 fs-sm text-center'>24/7 Customer <br />service</p>
            </div>
            <div className='col-span-4  flex flex-col justify-center items-center ms-2 mt-2'>
              <img src={BeginnerGuideicon} alt="" loading="lazy"  className='w-6 mb-2' />
              <p className='black-2 fs-sm text-center'>Beginner's guide</p>
            </div>
            <div className='col-span-4  flex flex-col justify-center items-center ms-2 mt-2' onClick={() => navigate("/main/About")}>
              <img src={Abouticon} alt="" loading="lazy"  className='w-6 mb-2' />
              <p className='black-2 fs-sm'>About us</p>
            </div>
          </div>
        </div>

        <button className='border flex  color-l font-normal  justify-center items-center border-[var(--bg-color-l)] w-[100%] rounded-full p-1 mt-6' onClick={()=>setShowPopup(true)}> <BiLogOutCircle className="rotate-90 text-md mr-2" /> Log Out</button>


    
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="nav-bg p-6 px-10 rounded-lg text-center">
                        <AiFillExclamationCircle className="mx-auto text-[#fb5b5b]" size={80} />
                        <h2 className="text-black font-semibold text-xl mt-4">Do you want to log out?</h2>
                        <div className="mt-6 gap-3 flex flex-col">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 blue-linear font-medium text-white rounded-full"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 border border-[var(--bg-color-l)] font-medium color-l rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
      </div>
      <CopyCopmponent copyPopup={copyPopup} message="Copy successful" />
      <CopyCopmponent copyPopup={refesh} message="Refesh successfully" />
    </Layout>
  )
}

export default Main
