import React from 'react'
import Img from "../assets/loader.png"
import { useSelector } from 'react-redux';
const Loader = () => {
  const { userInfo,bannergetData } = useSelector((state) => state.auth);
  return (
    <>
         <div className="loader" role="status">
         <img src={bannergetData?.gameall?.loader} alt="" />
                     
                 </div>
    </>
  )
}

export default Loader
