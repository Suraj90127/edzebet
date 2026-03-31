import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import { FaMobile } from 'react-icons/fa'
import { BsPhoneFill } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TbLockFilled } from 'react-icons/tb'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from "react-redux"
import { register } from '../../store/reducer/authReducer'
import AlertCopmponent from '../../components/AlertComponent'

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Register = () => {
    const [ccode, setCcode] = useState('91');
    const { loader, successMessage ,bannergetData} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alerts, setAlerts] = useState(false)
    const [alertsuccess, setAlertsuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('r_code');
    const [state, setState] = useState({
        username: "",
        pwd: "",
        cpass: "",
        invitecode: "",
        ccode: ""
    })

    const inputHandle = (e) => {
        setState({
            ...state,

            [e.target.name]: e.target.value,
        });
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async () => {
        dispatch(register(state)).then((res) => {

            if (res.payload.status) {
                setAlertsuccess(true)
      
                navigate('/login')
            } else {
                setAlerts(true)

            }
        })
    }


    useEffect(() => {
        setTimeout(() => {
            setAlerts(false)
            setAlertsuccess(false)
        }, 2000);
        setState({
            ...state,
            invitecode: code,
            ccode: ccode

        });
    }, [successMessage, dispatch, alerts, alertsuccess])


    return (
        <>
            <div className='blue-linear p-1  sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/login"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <div className='  text-center flex justify-center items-center m-auto'><img src={bannergetData?.gameall?.logo} alt="" className='w-28' /></div>
                </div>
            </div>
            <div className="blue-linear px-4 pb-8">
                <h1 className="heading-h1">Register</h1>
                <p className="fs-sm mt-2">Please register by phone number or email</p>
            </div>
            <div className="container-section">

      
            <div className="container-section mt-3">
                <div className='flex flex-col justify-center items-center'>
                    <span>
                        <BsPhoneFill className='color-l text-2xl' />
                    </span>
                    <h3 className="heading-h3 text-base  font-semibold mt-1 leading-7 color-l border-b-2 w-full text-center border-[var(--bg-color-l)]">Register your phone</h3>
                </div>

                <form action="" className='mt-5'>
                    <div>
                        <div className='flex items-center'>
                            <span>
                                <BsPhoneFill className='color-l text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Phone number</label>
                        </div>
                        <div className='mt-3 flex justify-between'>
                          
                        <div className='w-[24%] flex items-center justify-center font-bold text-sm gray-color nav-bg rounded-xl p-2'>
                                            +91 <MdKeyboardArrowDown className='ms-1 text-lg' />
                                        </div>

                            <input type="text" className='w-[75%] py-2  nav-bg border border-[--bgbody] rounded-lg p-2 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-200)] placeholder:font-medium' placeholder='Please enter the phone number'
                                name="username"
                                onChange={inputHandle}
                                value={state.username}
                            />
                        </div>
                    </div>
                    <p className='fs-sm mt-1 color-l leading-3'>The phone number cannot start with 0 when registering! <br />1234567890</p>
                    <div className='mt-4'>
                        <div className='flex items-center'>
                            <span>
                                <TbLockFilled className='color-l text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Set Password</label>
                        </div>
                        <div className='mt-3 flex justify-between relative'>

                            <input
                                type={showPassword ? 'text' : 'password'}

                                name="pwd"
                                onChange={inputHandle}
                                value={state.pwd}

                                className='w-full  nav-bg border border-[--bgbody] rounded-lg p-2 py-2 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-200)] placeholder:font-medium' placeholder='Please enter the password'

                            />
                            <span onClick={toggleShowPassword} className='absolute right-4 text-lg top-3 gray-50 cursor-pointer'>
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center'>
                            <span>
                                <TbLockFilled className='color-l text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Confirm Password</label>
                        </div>
                        <div className='mt-3 flex justify-between relative'>

                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                name="cpass"
                                onChange={inputHandle}
                                value={state.cpass}

                                className='w-full  nav-bg border border-[--bgbody] focus:[var(--grey-100)] rounded-lg p-2 py-2  ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-200)] placeholder:font-medium' placeholder='Please enter the confirm password'

                            />
                            <span onClick={toggleShowPassword2} className='absolute right-4 text-lg top-3 gray-50 cursor-pointer'>
                                {showPassword2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center'>
                            <span>
                                <TbLockFilled className='color-l text-2xl' />
                            </span>
                            <label htmlFor="" className='font-medium ms-1 gray-50'>Invite code</label>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <input type="text" className='w-full  nav-bg border border-[--bgbody] rounded-lg p-2 py-2 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-200)] placeholder:font-medium' placeholder='Please enter the invitation code'
                                name="invitecode"
                                onChange={inputHandle}
                                value={state.invitecode}
                            />
                        </div>
                    </div>
                    <div className='flex items-center mt-4'>
                        <label className="flex items-center ">
                            <input
                                type="checkbox"
                                className="hidden peer"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-[var(--bg-color-l)] peer-checked:bg-[var(--bg-color-l)]">
                                <svg
                                    className={`w-3 h-3 text-white ${isChecked ? 'block' : 'hidden'}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.586l6.793-6.793a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="gray-100 ms-2 mr-2 fs-sm cursor-pointer">I have read and agree</span> <Link className='color-red-200 '>[Privacy Agreement]</Link>
                        </label>
                    </div>

                </form>
                <button className='blue-linear flex justify-center text-white text-lg  w-72   m-auto font-semibold text-center  rounded-full p-1 mt-5 tracking-widest' disabled={loader ? true : false} onClick={() => handleSubmit()}>Register</button>

                <button className='border  w-72 flex color-l font-semibold  justify-center items-center border-[var(--bg-color-l)] m-auto rounded-full p-1 mt-6 ' onClick={() => navigate("/login")}><span className='text-sm font-normal mr-2 gray-100 tracking-widest'>I have an account</span> <span className='tracking-widest font-bold text-lg'>Login</span></button>



            </div>
            </div>
            <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>

                <div className='text-sm'>{successMessage}</div>
            </div>

            <AlertCopmponent alertPopup={alerts} message={successMessage} />
        </>
    )
}

export default Register
