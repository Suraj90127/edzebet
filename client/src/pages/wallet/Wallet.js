import React, { useEffect, useMemo, useState } from 'react'
import "./wallet.css"
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { IoWallet } from 'react-icons/io5'
import { FaRegCircle } from 'react-icons/fa'
import DepositImg from "../../assets/rechargeIcon.png"
import WithdrawImg from "../../assets/widthdrawBlue.png"
import DepositHisImg from "../../assets/rechargeHistory.png"
import WithdrawHisImg from "../../assets/withdrawHistory.png"
import { GiEightBall } from 'react-icons/gi'
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { jilliWallet, jilliWalletTransfer, SpribeGamemoneyTransfer } from '../../store/reducer/gameReducer'
import { userDetail } from '../../store/reducer/authReducer'
import Spinner from '../../layout/Spinner'

const Wallet = React.memo(() => {

  const { userInfo, loader } = useSelector((state) => state.auth)
  const { jilliWalletData } = useSelector((state) => state.game)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(jilliWallet())
    dispatch(userDetail())
  }, [])

  const handleTransfer = () => {
    dispatch(jilliWalletTransfer()).then((res) => {
      if (res.payload.status) {
        dispatch(userDetail())
        dispatch(SpribeGamemoneyTransfer())
        dispatch(jilliWallet())
      }
    })
  }


  return (
    <Layout>
      <div className='nav-bg p-2 sticky top-0 z-10'>
        <div className="container-section flex items-center">
          {/* <button><Link to={"/promotion"}><IoIosArrowBack className='text-xl' /></Link></button> */}
          <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>Wallet</h1>
        </div>
      </div>
      {!userInfo && (
        <Loader />
      )}

      <div className="nav-bg flex flex-col justify-center items-center py-4">
        <p><IoWallet className='color-l text-4xl' /></p>
        <h3 className="heading text-2xl font-medium">trx{Number(userInfo?.money_user)?.toFixed(2)}</h3>
        <p className="fs-sm">Total balance</p>


      </div>
      {/* <div className=' nav-bg py-4 flex justify-around'> 
          <div className='text-center'>
           <h4>{userInfo?.totalRecharge?userInfo?.totalRecharge:0}</h4> 
           <p className='fs-sm'>Total deposit amount</p>
          </div>
          <div className='text-center'>
           <h4>{userInfo?.totalWithdraw?userInfo?.totalWithdraw:0}</h4> 
           <p className='fs-sm'>Total withdraw amount</p>
          </div>
        </div> */}

      <div className="container-section mt-3">
        <div className="nav-bg p-3 rounded-lg">
          <div className='flex  justify-between px-8 pt-4'>
            <div className='relative inline-block'>
              <FaRegCircle className='color-l text-[100px]' />
              <span className='absolute top-[30%] left-[40%]'>0%</span>
              <p className='text-center text-sm gray-100'>trx{Number(userInfo?.money_user)?.toFixed(2)}</p>
              <p className='text-center fs-sm gray-100'>Main Wallet</p>
            </div>
            <div className='relative inline-block'>
              <FaRegCircle className='gray-color-100 text-[100px]' />
              <span className='absolute top-[30%] left-[40%]'>0%</span>
              <p className='text-center text-sm gray-100'>
                trx{jilliWalletData?.Data && (Number(jilliWalletData?.Data[0].Balance)) + Number(userInfo?.betAmount)}
              </p>

              <p className='text-center fs-sm gray-100'>3rd party Wallet</p>
            </div>
          </div>
          <button className='blue-linear w-full p-1 text-lg font-bold my-2 rounded-full mt-3' onClick={handleTransfer}>Main wallet transfer</button>

          <div className='flex justify-between mt-4 mx-2'>
            <div onClick={() => navigate("/wallet/Recharge")}>
              <img src={DepositImg} alt="" className='w-12' />
              <p className='fs-sm gray-100 text-center mt-2'>Deposit</p>
            </div>
            <div onClick={() => navigate("/wallet/Withdraw")}>
              <img src={WithdrawImg} alt="" className='w-12' />
              <p className='fs-sm gray-100 text-center mt-2'>Withdraw</p>
            </div>
            <div onClick={() => navigate("/wallet/RechargeHistory")}>
              <img src={DepositHisImg} alt="" className='w-12' />
              <p className='fs-sm gray-100 text-center mt-2'>Deposit <br /> history</p>
            </div>
            <div onClick={() => navigate("/wallet/WithdrawalHistory")}>
              <img src={WithdrawHisImg} alt="" className='w-12' />
              <p className='fs-sm gray-100 text-center mt-2'>Withdrawal <br /> history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-section mt-3">
        <div className='grid grid-cols-12 gap-2 '>
          {LotteryData.map((item, i) => (
            <div key={i} className={`col-span-4 rounded-md relative nav-bg flex flex-col justify-center items-center  py-5 ${i === 0 ? "blue-linear color-orange" : "gray-50"}`}>
              <h5 className="heading-h5 fs-sm  mb-3">
                {i === 0 ? `trx${Number(userInfo?.money_user)?.toFixed(2)}` : i === 1 ? `trx${jilliWalletData?.Data && (Number(jilliWalletData?.Data[0].Balance)) + Number(userInfo?.betAmount)}` : item.amount}
              </h5>
              <p className={`fs-sm ${i === 0 ? "color-orange" : "gray-100"}`}>{item.name}</p>
              <span className='absolute top-4 text-6xl' style={{ color: "#d9d9d91a" }}>
                {item.Icons}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
})

export default Wallet


const LotteryData = [
  {
    amount: "0.0",
    name: "Lottery",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "TB_Chess",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "Wickets9",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "CQ9",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "MG",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "JDM",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "DG",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "CMD",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "Saba",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "EVO_Video",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "JILI",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "Card365",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "VSCard",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "AG_Video",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "PG",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "TB",
    Icons: < GiEightBall />
  },
  {
    amount: "0.00",
    name: "WM_Video",
    Icons: < GiEightBall />
  },

]