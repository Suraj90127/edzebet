import React, { useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ActivityDetail = () => {
    const { userInfo,bannergetData } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[])
    return (
        <>
            <div className='nav-bg p-1 py-3 sticky top-0 z-10'>
                <div className="container-section flex justify-between items-center">
                    <button className='absolute' onClick={() => navigate("/activity")}><IoIosArrowBack className='text-xl' /></button>
                    <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>Activity details</h1>
                </div>
            </div>
{id==2&&(
            <div>
                <img src={bannergetData?.activity?.ban2} alt="" className='w-full' />
                <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium"> VIP Weekly Package</h3>
                <div className="container-section">
                    <img src={bannergetData?.activity?.ban22} alt="" />

                    {/* <p className='fs-sm text-center gray-50 mt-3'> Please click the link beloto reach our Package</p>
                    <Link to={userInfo?.telegram} className="fs-sm color-blue-500 text-center flex justify-center">{userInfo?.telegram}</Link> */}
                </div>
            </div>

)}
{id==3&&(
            <div>
                <img src={bannergetData?.activity?.ban3} alt="" className='w-full' />
                <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">💰 Member Activities Winning Streak 💰</h3>
                <div className="container-section">
                    <img src={bannergetData?.activity?.ban33} alt="" />

                                   </div>
            </div>
)}
{id==4&&(
            <div>
                <img src={bannergetData?.activity?.ban4} alt="" className='w-full' />
                <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">▶️ {bannergetData?.gameall?.name} Creative Video ▶️</h3>
                <div className="container-section">
                    <img src={bannergetData?.activity?.ban44} alt="" />
  </div>
            </div>
)}
{id==5&&(
            <div>
                <img src={bannergetData?.activity?.ban5} alt="" className='w-full' />
                <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">🔄 Lucky "10" Days Of Interest 🔄</h3>
                <div className="container-section">
                    <img src={bannergetData?.activity?.ban55} alt="" />
  </div>
            </div>
)}
{id==6&&(
            <div>
                <img src={bannergetData?.activity?.ban6} alt="" className='w-full' />
                <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">🚀 Aviator Fly High & Win Big 🚀</h3>
                <div className="container-section">
                    <img src={bannergetData?.activity?.ban66} alt="" />
  </div>
            </div>
)}
{id==7&&(
            <div>
                <img src={bannergetData?.activity?.ban7} alt="" className='w-full' />
                <h3 className="heading-h3 text-center mt-3 mb-1 gray-50 font-medium">⁉️ Mysterious Gift ⁉️</h3>
                <div className="container-section">
                    <img src={bannergetData?.activity?.ban77} alt="" />
  </div>
            </div>
)}

        </>
    )
}

export default ActivityDetail
