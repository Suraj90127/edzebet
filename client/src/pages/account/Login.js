import React, {  useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import { ImMobile } from 'react-icons/im'
import { MdEmail, MdKeyboardArrowDown, MdLock } from 'react-icons/md'
import { TbLockFilled } from 'react-icons/tb'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

import { BsPhoneFill } from "react-icons/bs";
import CustomerImg from "../../assets/customerserviceIcon.png"
import { emailLogin, login,  } from '../../store/reducer/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import AlertCopmponent from '../../components/AlertComponent'
import axios from 'axios'

import { Verify } from 'react-puzzle-captcha';
import 'react-puzzle-captcha/dist/react-puzzle-captcha.css';
import PhoneInput from 'react-phone-input-2'

const Login = () => {
    const { successMessage, userInfo,loader,bannergetData } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ccode, setCcode] = useState('94');
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState('')
    const [username, setUsername] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [tabs, setTabs] = useState("phone")
    const [alerts, setAlerts] = useState(false)
    const [value,setValue]=useState()
    const [alertsuccess, setAlertsuccess] = useState(false)
    const location = useLocation()
    const [referesh, setRefesh] = useState(false)
    const [visible, setVisible] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const [isChecked, setIsChecked] = useState(false);



    const [state, setState] = useState({
        username: "",
        pwd: "",
    })

   
    const getCurrentFormattedDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };


    const handleSuccess=async()=>{
        setVisible(false);
        
        dispatch(login({ username, pwd })).then((res) => {
            if (res.payload.status) {
                setAlertsuccess(true)
                const formattedDate = getCurrentFormattedDate();
                localStorage.setItem('currentDate', formattedDate);
                navigate("/")
                localStorage.setItem("topup", true)
                localStorage?.removeItem('wingominute')
                localStorage?.removeItem('trxminute')
                localStorage?.removeItem('k3minute')
                localStorage?.removeItem('d5minute')
                localStorage.removeItem("app")
            } else {
                setAlerts(true)
            }
        })
    }

    


    axios.defaults.withCredentials = true

    const handleSubmit = async () => {
        setVisible(true);
     
    }

    const handleSubmitEmail = async () => {
        dispatch(emailLogin({ email, pwd })).then((res) => {
            if (res.payload.status) {
                setAlertsuccess(true)
                const formattedDate = getCurrentFormattedDate();
                localStorage.setItem('currentDate', formattedDate);
                navigate("/")

            } else {
                setAlerts(true)
            }
        })
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (isChecked) {
            localStorage.removeItem('phone');
            localStorage.removeItem('pass');
        } else {

            localStorage.setItem('phone', state.username);
            localStorage.setItem('pass', state.pwd);

        }
    };


    useEffect(() => {
        setTimeout(() => {
            setAlerts(false)
            setAlertsuccess(false)
            setRefesh(false);
        }, 2000);

      


    }, [successMessage, dispatch, state,visible, referesh, alerts, alertsuccess])


    useEffect(() => {
        if (userInfo && location.pathname === '/login') {
            navigate('/');
            console.log("User is logged in, redirecting to homepage.");
        } else if (!userInfo && location.pathname !== '/login') {
            console.log("User not found, redirecting to login.");
            navigate('/login');
        }

        const phones = localStorage.getItem("phone")
        if (phones) {
            setIsChecked(true)
        }
        setState({
            ...state,
            username: localStorage.getItem("phone"),
            pwd: localStorage.getItem("pass")
        });
        setUsername(localStorage.getItem("phone"))
        setPwd(localStorage.getItem("pass"))

    }, [userInfo, location.pathname, navigate]);


  
    return (
        <>
{visible&&(

<div className='absolute top-0 z-10 left-0 right-0 bottom-0 flex justify-center items-center'>

        <Verify
   
   width={320}
   height={160}
   visible={visible}
   onSuccess={() => handleSuccess()}
   onFail={() => setAlerts(true)}
   onRefresh={() => setRefesh(true)}
   />
            </div>

)}
      

      
      <div className={visible ? "overlay-section block" : "hidden"}></div>


            <div className='nav-bg px-1  sticky top-0'>
                <div className="container-section flex  items-center relative ">
                    <button className='absolute'><Link to={"/"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <div className='  text-center flex justify-center items-center m-auto'><img src={Logo} alt="" className='w-28' /></div>
                </div>
            </div>
            <div className="nav-bg px-4 pb-8">
                <h1 className="heading-h1">Log in</h1>
                <p className="fs-sm mt-2">Please log in with your phone number or email <br />
                    If you forget your password, please contact customer service
                </p>
            </div>
            <div className="container-section mt-3">
                <div className="container-section">
                <div className='flex items-center justify-between border-b border-[var(--gray-170)]'>
                    <div className={`flex flex-col justify-center items-center cursor-pointer  w-[50%] ${tabs === "phone" ? "border-b-2 border-[var(--bg-color-l)]" : "border-b-2 border-transparent"}`} onClick={() => setTabs("phone")}>
                        <span>
                            <BsPhoneFill className={`${tabs === "phone" ? "color-l" : "gray-100"} text-2xl`} />
                        </span>
                        <h3 className={`heading-h3 text-base  font-medium font-sans   leading-7 ${tabs === "phone" ? "color-l" : "gray-100"} w-full text-center `}>phone number</h3>
                    </div>
                    <div className={`flex flex-col justify-center items-center cursor-pointer  w-[50%] ${tabs === "email" ? "border-b-2 border-[var(--bg-color-l)]" : "border-b-2 border-transparent"}`} onClick={() => setTabs("email")}>
                        <span>
                            <MdEmail className={`${tabs === "email" ? "color-l" : "gray-100"} text-2xl`} />
                        </span>
                        <h3 className={`heading-h3 text-base  font-medium font-sans  leading-7 ${tabs === "email" ? "color-l" : "gray-100"} w-full text-center `}>Email login</h3>
                    </div>
                </div>
                {tabs === "phone" ? (
                    <div>
                        <form action="" className='mt-5'>
                            <div>
                                <div className='flex items-center'>
                                    <span>
                                        <BsPhoneFill className='color-l text-2xl' />
                                    </span>
                                    <label htmlFor="" className='font-sans  ms-1 gray-100'>Phone number</label>
                                </div>
                                <div className='mt-3 flex justify-between'>
                                <div className='w-[24%] flex items-center justify-center font-bold text-sm gray-100 nav-bg rounded-lg '>


<PhoneInput
    country={'in'}
    value={ccode}
    onChange={setCcode} 
    placeholder="Enter phone number"
    inputClass="my-custom-input" 
/>


</div>

                                    <input type="number" className='w-[75%] py-3  nav-bg border border-[--bgbody] rounded-xl p-2 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-100)]' placeholder='Please enter your phone number'

                                        name="username"
                                        onChange={(e)=>setUsername(e.target.value)}
                                        value={username}

                                    />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className='flex items-center'>
                                    <span>
                                        <TbLockFilled className='color-l text-2xl' />
                                    </span>
                                    <label htmlFor="" className='font-sans ms-1 gray-100'>Password</label>
                                </div>
                                <div className='mt-3 flex justify-between relative'>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="pwd"
                                        onChange={(e)=>setPwd(e.target.value)}
                                        value={pwd}
                                        className='w-full  nav-bg border border-[--bgbody] rounded-xl p-2 py-3 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-100)]' placeholder=' Password'
                                    />
                                    <span onClick={toggleShowPassword} className='absolute right-4 text-lg top-4 gray-50 cursor-pointer'>
                                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                    </span>
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
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-[var(--bg-color-l)] peer-checked:bg-[var(--bg-color-l)]">
                                        <svg
                                            className={`w-4 h-4 text-white ${isChecked ? 'block' : 'hidden'}`}
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
                                    <span className="gray-100 ms-2 mr-2 fs-sm cursor-pointer">Remember password</span>
                                </label>
                            </div>
                            {/* disabled={loader?true:false} */}
                        </form>
                        <button className='blue-linear flex justify-center color-orange text-lg  w-72   m-auto font-bold text-center  rounded-full p-1 mt-5 tracking-[3px]'   onClick={handleSubmit}>Log in</button>

                        <button className='border  w-72 flex color-l font-semibold  justify-center items-center border-[var(--bg-color-l)] m-auto rounded-full p-1 mt-6 ' onClick={() => navigate("/register")}> <span className='tracking-[3px] font-bold text-lg'>Register</span></button>

                    </div>
                ) : (
                    <div>
                        <form action="" className='mt-5'>
                            <div>
                                <div className='flex items-center'>
                                    <span>
                                        <MdEmail className='color-l text-2xl' />
                                    </span>
                                    <label htmlFor="" className='font-sans  ms-1 gray-100'>Mail</label>
                                </div>
                                <div className='mt-3 flex justify-between'>

                                    <input type="text" className='w-full py-3  nav-bg border border-[--bgbody] rounded-xl p-2 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-100)]' placeholder='Please enter your email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className='flex items-center'>
                                    <span>
                                        <TbLockFilled className='color-l text-2xl' />
                                    </span>
                                    <label htmlFor="" className='font-sans ms-1 gray-100'>Password</label>
                                </div>
                                <div className='mt-3 flex justify-between relative'>

                                    <input
                                        type={showPassword ? 'text' : 'password'}


                                        className='w-full  nav-bg border border-[--bgbody] rounded-xl p-2 py-3 focus:[var(--grey-100)] ps-6 flex items-center focus:border focus:outline-none  placeholder:text-sm placeholder:text-[var(--grey-100)]' placeholder='Password'
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                    />
                                    <span onClick={toggleShowPassword} className='absolute right-4 text-lg top-4 gray-50 cursor-pointer'>
                                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                    </span>
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
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-[var(--bg-color-l)] peer-checked:bg-[var(--bg-color-l)]">
                                        <svg
                                            className={`w-4 h-4 text-white ${isChecked ? 'block' : 'hidden'}`}
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
                                    <span className="gray-100 ms-2 mr-2 fs-sm cursor-pointer">Remember password</span>
                                </label>
                            </div>


                        </form>
                        <button className='blue-linear flex justify-center  text-lg  w-72  color-orange m-auto font-bold text-center  rounded-full p-1 mt-5 tracking-[3px]'  disabled={loader?true:false}  onClick={() => handleSubmitEmail()}>Log in</button>

                        <button className='border  w-72 flex color-l font-semibold  justify-center items-center border-[var(--bg-color-l)] m-auto rounded-full p-1 mt-6 ' onClick={() => navigate("/register")}> <span className='tracking-[3px] font-bold text-lg'>Register</span></button>
                    </div>
                )}



                <div className='flex items-center justify-between mt-10'>
                    <Link className='flex items-center justify-center flex-col w-[50%]' to={"/forgot"}>
                        <span>
                            <MdLock className='color-l text-4xl' />
                        </span>
                        <p className='text-sm gray-50'>Forgot password</p>
                    </Link>
                    <Link className='flex items-center justify-center flex-col w-[50%]' to={"/main/CustomerService"}>
                        <img src={CustomerImg} alt="" className='w-8 filter-imgs' />
                        <p className='text-sm gray-50'>Customer Service</p>
                    </Link>
                </div>
                </div>
            </div>







            <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>

                <div className='text-sm'>{successMessage}</div>
            </div>

            <AlertCopmponent alertPopup={alerts} message={successMessage} />
        </>
    )
}

export default Login
