import React, { useEffect } from 'react'
import "./activity.css"
import Layout from '../../layout/Layout'
import Logo from "../../assets/logo.png"

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import ban1 from '../../assets/banner/SAVE_20250222_162908.jpg'
import ban2 from '../../assets/banner/SAVE_20250222_112554.jpg'
import ban3 from '../../assets/banner/SAVE_20250222_011628.jpg'
import ban4 from '../../assets/banner/SAVE_20250222_242255 (1).jpg'





const InvitationImg = 'https://i.ibb.co/xhV8w6w/invitation-Bonus.png'
const bettingImg = 'https://i.ibb.co/Kz8vtWT/Betting-Rebate.png"'
const SupperImg = 'https://i.ibb.co/1MbggqG/super-Jackpot.png'
const MemberGiftImg = 'https://i.ibb.co/Hg13hYF/member-Gift.png'

const GiftImg = "https://i.ibb.co/GkJh6My/sign-In-Banner.png"
const AttendanceImg = "https://i.ibb.co/PCm07tj/gift-Redeem.png"


const Activity = () => {
  const { userInfo,bannergetData } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Layout>
      <div className="flex justify-center  nav-bg">
        <img src={Logo} alt="" loading="lazy"  className='w-36' />
      </div>

      {!userInfo &&(
        <Loader/>
      )}
      <div className='nav-bg p-3'>

        <h3 className="heading-h3 font-medium mb-1">Activity</h3>
        <p className='fs-sm'>Please remember to follow the event page</p>
        <p className='fs-sm'>We will launch user feedback activities from to time</p>
      </div>
      <div className="container-section mt-3">
        <div className="flex justify-around items-center">
          <div className=" flex flex-col justify-center items-center " onClick={() => navigate("/main/InvitationBonus")}>
            <img src={InvitationImg} alt="" loading="lazy"  className='w-10' />
            <p className='fs-sm gray-100 text-center leading-3 mt-2'>Invitation <br /> bonus</p>
          </div>

          <div className=" flex flex-col justify-center items-center" onClick={() => navigate("/main/Laundry")}>
            <img src={bettingImg} alt="" loading="lazy"  className='w-10' />
            <p className='fs-sm gray-100 text-center leading-3 mt-2'>Betting <br /> rebate</p>
          </div>
          <div className=" flex flex-col justify-center items-center" onClick={() => navigate("/main/SuperJackpot")}>
            <img src={SupperImg} alt="" loading="lazy"  className='w-10' />
            <p className='fs-sm gray-100 text-center leading-3 mt-2'>Super<br />Jackpot</p>
          </div>
          {/* <div className=" flex flex-col justify-center items-center" onClick={() => navigate("/activity/MemberPackage")}>
            <img src={MemberGiftImg} alt="" loading="lazy"  className='w-10' />
            <p className='fs-sm gray-100 text-center leading-3 mt-2'>New member <br />gift package</p>
          </div> */}
        </div>


        <div className="grid grid-cols-12 gap-3 mt-5">
          <div className="col-span-6 nav-bg rounded-md" onClick={() => navigate("/main/RedeemGift")}>
            <img src={GiftImg} alt="" loading="lazy"  />
            <div className='p-2 mb-3'>
              <h3 className="heading-h3  mb-1 text-sm font-bold">Gift</h3>
              <p className='gray-100  fs-sm'>Enter the redemption code to recieve gift rewards</p>
            </div>
          </div>
          <div className="col-span-6 nav-bg rounded-md" onClick={() => navigate("/activity/DailySignIn")}>
            <img src={AttendanceImg} alt="" loading="lazy"  />
            <div className='p-2 mb-3'>
              <h3 className="heading-h3 text-white mb-1 text-sm font-bold">Attendance bonus</h3>
              <p className='gray-100  fs-sm'>The more consecutive days you sign in, the higher the reward will be.</p>
            </div>
          </div>
        </div>


        <div className='nav-bg mt-3 rounded-xl' onClick={()=>navigate("/activity/DailySignIn")}>
          <img src={ban1} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full' />
          <h3 className="heading-h3 gray-50 font-bold p-2">Get Daily Check-in Bonus</h3>
        </div>
        <div className='nav-bg mt-3 rounded-xl' onClick={()=>navigate("/activity/ActivityDetail?id=2")}>
          <img src={ban2} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full ' />
          <h3 className="heading-h3 gray-50 font-bold p-2">VIP Weekly & Monthly Package</h3>
        </div>
        <div className='nav-bg mt-3 rounded-xl'  onClick={()=>navigate("/activity/ActivityDetail?id=3")}>
          <img src={ban3} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full' />
          <h3 className="heading-h3 gray-50 font-bold p-2">Member Activities Winning Streak</h3>
        </div>
        <div className='nav-bg mt-3 rounded-xl'  onClick={()=>navigate("/activity/ActivityDetail?id=4")}>
          <img src={ban4} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full' />
          <h3 className="heading-h3 gray-50 font-bold p-2">{bannergetData?.gameall?.name} Creative Video</h3>
        </div>
        <div className='nav-bg mt-3 rounded-xl'  onClick={()=>navigate("/activity/ActivityDetail?id=5")}>
          <img src={ban1} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full' />
          <h3 className="heading-h3 gray-50 font-bold p-2">Lucky "10" Days Of Interest</h3>
        </div>
        <div className='nav-bg mt-3 rounded-xl'   onClick={()=>navigate("/activity/ActivityDetail?id=6")}>
          <img src={ban2} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full' />
          <h3 className="heading-h3 gray-50 font-bold p-2">Aviator Fly High & Win Big</h3>
        </div>
        <div className='nav-bg mt-3 rounded-xl'   onClick={()=>navigate("/activity/ActivityDetail?id=7")}>
          <img src={ban3} alt="" loading="lazy"  className='rounded-t-xl h-44 w-full' />
          <h3 className="heading-h3 gray-50 font-bold p-2">Mysterious Gift</h3>
        </div>
       

      </div>

    </Layout>
  )
}

export default Activity
