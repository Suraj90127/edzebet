import React, { useCallback, useEffect, useState } from "react";
import { RxCross2, RxCrossCircled, RxDividerVertical } from "react-icons/rx";

import "./home.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Swiper, SwiperSlide } from "swiper/react";

//my code
import Logo from "../../assets/LOGO/logo.png";
import LotteryGameSection from "./lottery/LotteryGameSection";

//end my code

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { TfiEmail } from "react-icons/tfi";
import Slider from "react-slick";

import { RiHome5Fill, RiVolumeUpFill } from "react-icons/ri";
import { PiChartBarFill, PiTargetBold } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { FaChessQueen, FaGlobe } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

import Layout from "../../layout/Layout";

import { MdEmail } from "react-icons/md";
import { FaGift } from "react-icons/fa6";

import {
  CasinoGameData,
  HotGameData,
  SlotsGameData,
  originalData,
  originalData2,
} from "./ImgData";
import { BiSupport } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rechargeList, userDetail } from "../../store/reducer/authReducer";
import debounce from "lodash/debounce";
import { IoIosArrowForward } from "react-icons/io";
import MainLoader from "../../components/MainLoader";
import {
  gamelist_strip,
  gamelist_strip_start,
  jilliGame,
} from "../../store/reducer/gameReducer";
import { Casino, Crash, Fishing, Jilli, Rummy, Slots } from "./AllGameImg";
import App from "../../assets/banner/bdg.apk";

import LeftSvg from "../../assets/left-arrow.svg";
import RightSvg from "../../assets/right-arrow.svg";
import LotterySvg from "../../assets/lotter.svg";
import Recharge from "../../assets/rech.svg";

import PopularImg from "../../assets/tiranga/popular.png";
import PopularIcon from "../../assets/bdgimg/popularicon.png";
import LotteryIcon from "../../assets/bdgimg/lotteryicon.png";
import SlotsIcon from "../../assets/bdgimg/slotsicon.png";
import SportsIcon from "../../assets/bdgimg/slotsicon.png";
import CasinoIcon from "../../assets/bdgimg/casinoicon.png";
import RummyIcon from "../../assets/bdgimg/rummyicon.png";
import FishingIcon from "../../assets/bdgimg/fishing.png";
import OriginalIcon from "../../assets/bdgimg/originalicon.png";

import WinningInformation from "./WinningInformation";
import EarningImg from "../../assets/bdgimg/DailyProfitRank.png";

import Crown2 from "../../assets/tiranga/crown2.png";
import Place2 from "../../assets/tiranga/place2.png";
import Crown1 from "../../assets/tiranga/crown1.png";
import Place1 from "../../assets/tiranga/place1.png";
import Crown3 from "../../assets/tiranga/crown3.png";
import Place3 from "../../assets/tiranga/place3.png";

import { AvatarData } from "../main/AvatarData";
import Popular from "./Popular";
import Lotterys from "./Lotterys";
// import Slots from "./Spots";
// import Sports from "./Sports";
// import Casino from "./Casino";
// import Rummy from "./Rummy";

import Original from "./Original";
import { BsFire } from "react-icons/bs";
import Apkdownload from "./Apkdownload";

import Banner3 from "../../assets/banner/ban3.png";
import Banner1 from "../../assets/banner/ban1.png";
import Banner2 from "../../assets/banner/ban2.png";

import BasicTools from "./lottery/BasicTools";
import PlatformDetails from "./lottery/PlatformDetails";

// import img lottery
const img1 = "https://i.ibb.co/H4QfcW0/1.png";
const img2 = "https://i.ibb.co/LNGDMJR/2.png";
const img3 = "https://i.ibb.co/R7jkGZr/3.png";
const img4 = "https://i.ibb.co/48ks1Yc/4.png";







const ActivityImg = "https://i.ibb.co/8MHtVy2/activity.png";
const InviteImg = "https://i.ibb.co/n3FJNP4/invite.png";
const WingoImg = "https://i.ibb.co/hYR6Xnk/wingo.png";
const k3Img = "https://i.ibb.co/mXdjN2z/k3.png ";
const FivedImg = " https://i.ibb.co/CP7XwY6/fived.png";
const TrxImg = "https://i.ibb.co/GVjVKhP/trx.png";
const HotSvg = "https://i.ibb.co/N7LBtZc/hotsvg.png";
const OriginalSvg = "https://i.ibb.co/JcMhqCS/originalsvg.png";
const casinoSvg = "https://i.ibb.co/ggyWWZR/casinosvg.png";
const slotsSvg = "https://i.ibb.co/bLkqZQ8/slotssvg.png";

const Age = "https://i.ibb.co/BVVHsCR/age.png";
const Telegram = "https://i.ibb.co/BBxZrRk/telegram.png";
const Whatsapp = "https://i.ibb.co/2s9cJBZ/whatsapp.png";
const Esport = "https://i.ibb.co/cb7qBnb/physical.png";
const Avatar = "https://i.ibb.co/gRggD5v/avatar5.png";
const Withdraw = "https://i.ibb.co/JxDKYHY/moneys.png";
const OriginalImg1 = "https://i.ibb.co/Z2YDPPV/aviator.png";
const Aviator = "https://i.ibb.co/Z2YDPPV/aviator.png";

const Home = () => {
  const { userInfo, bannergetData, rechargelistData } = useSelector((state) => state.auth);

  console.log("bannergetData", bannergetData?.gameall?.logo);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [topup, setTopup] = useState(false);
  const [topup2, setTopup2] = useState(false);
  const [jilliPopup, setJilliPopup] = useState(false);
  const [gameId, setGameId] = useState();
  const [apps, setApp] = useState(true);
  const [tabs, setTabs] = useState("Lottery");
  const [betAlert, setBetAlert] = useState(false);
  const [repopup, setRepoup] = useState(false);


  const handleClick = () => {
    setOpen(!open);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const debouncedDispatch = useCallback(
    debounce(() => {
      dispatch(userDetail());
    }), // Adjust the debounce delay as needed
    [dispatch]
  );
  useEffect(() => {
    debouncedDispatch(); // Call the debounced dispatch function
    window.scrollTo({ top: 0, behavior: "smooth" });
    const data = localStorage.getItem("topup");
    if (data == "true") {
      setTopup(true);
    }
  }, [debouncedDispatch]); // Empty dependency array ensures it runs only once
  const handleTopup = () => {
    localStorage.setItem("topup", false);
    setTopup(false);
    setTopup2(true);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleJilliOpen = (data) => {
    setGameId(data);
    dispatch(rechargeList()).then((res) => {
    if (res.payload.data2?.length == 0) {
      setRepoup(true)
    } else {
      setJilliPopup(true);
    }
  })
  };

  const handleJilliSubmit = () => {
    if (userInfo === undefined || userInfo === "") {
      navigate("/login");
    } else {

      if (userInfo?.isdemo == 0) {
        dispatch(jilliGame(gameId)).then((res) => {
          if (res.payload.status) {
            window.open(res.payload.data.url, "_blank");
            setJilliPopup(false);
          }
        });
      } else {
        setBetAlert(true);
        setTimeout(() => {
          setBetAlert(false);
        }, 2000);
      }

    }
  };

  useEffect(() => {
    dispatch(rechargeList())

    const data = localStorage.getItem("app");

    if (data === "closed") {
      // Check for the specific value you set
      setApp(false);
    } else {
      setApp(true);
    }
  }, []);

  useEffect(() => {
    if (topup || topup2) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto"; // or 'visible' depending on your default
    };
  }, [topup2, topup]);

  const handlGo = () => {
    const currentUrl = window.location.origin;
    const url = `${currentUrl}/aviator`;
    window.open(url, "_blank");
  };

  const notices = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 4000,
    verticalSwiping: true,
    arrows: false, // This removes the arrows
    cssEase: "linear", // Smooth scrolling effect
  };

  const handleCheck = (path) => {
    dispatch(rechargeList()).then((res) => {
      if (res.payload.data2?.length == 0) {
        setRepoup(true)
      } else {
        navigate(path)
      }
    })
  };

  const handleCloseRecharge = () => {
    navigate("/wallet/Recharge");
    setRepoup(false)
  }

  return (
    <Layout>


      <div className={repopup ? "overlay-section block z-10" : "hidden"}></div>

      {repopup && (
        <div className="fixed top-0 z-10 bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
          <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
          <p className="text-sm gray-100 mt-2">
            First need to recharge for this game
          </p>

          <div className="w-full mt-5">
            <button
              className="bgs-blue-500 p-2 w-[50%]  rounded-bl-lg "
              onClick={() => setRepoup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue p-2 rounded-br-lg  w-[50%]"
              onClick={handleCloseRecharge}
            >
              Confirm
            </button>
          </div>
        </div>
      )}


      <div className="home-bg sticky top-0 z-20  ">
        {userInfo && userInfo ? (
          <div className="home-nav flex items-center justify-between rounded-md px-3 py-1">
            <div className="flex items-center">
              <div className="logo">
                <img
                  src={bannergetData?.gameall?.logo}
                  alt="loading img"
                  loading="lazy"
                  className="w-[100px]"
                />
              </div>
            </div>
            <div className="flex items-center">
              <p className="fs-sm font-medium color-blue border border-[var(--main-color)] p-2 rounded-md">
                ₹
                {userInfo?.money_user
                  ? Number(userInfo?.money_user).toFixed(2)
                  : 0}
              </p>
            </div>
          </div>
        ) : (
          <div className="home-nav flex items-center justify-between rounded-md px-3">
            <div className="logo py-2">
              <img
                src={bannergetData?.gameall?.logo}
                alt="loading img"
                loading="lazy"
                className="w-[100px]"
              />
            </div>
            <div className="flex items-center">
              <button
                className="blue-linear p-1 px-3 text-sm  border-color-blue border rounded-md"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className=" ml-2 px-2 p-1 text-sm border-color-blue border rounded-md color-blue "
                onClick={() => navigate("/register")}
              >
                Register
              </button>{" "}
            </div>
          </div>
        )}
      </div>

      {/* bannner */}
      <div className="container-section ">
        <div className="home-slider-banner">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="w-full">
                <img
                  src={bannergetData?.data?.ban1}
                  className="w-full rounded-md h-20"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full">
                <img
                  src={bannergetData?.data?.ban2}
                  className="w-full rounded-md h-20"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="w-full">
                <img
                  src={bannergetData?.data?.ban3}
                  className="w-full rounded-md h-20"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* notice board */}
          <div className="banner-notice nav-bg mt-6   rounded-full flex items-center justify-between">
            <RiVolumeUpFill className="text-xl color-l absolute" />

            <div className="slider-container h-10 ms-6 mr-2 overflow-hidden">
              <Slider {...notices}>
                <div>
                  <h3 className="text-sm text-black">
                    Welcome to the {bannergetData?.gameall?.name}! Greetings,
                    Gamers and Enthusiasts! The {bannergetData?.gameall?.name}{" "}
                    is more than just a platform for gaming. We invite you to
                    join us, you'll find a variety of games, promo, bonus,
                    luxury gold awards, Register now and win.
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm text-black">
                    If your deposit not receive, please send it directly to{" "}
                    {bannergetData?.gameall?.name} Self-service Center{" "}
                    {bannergetData?.gameall?.name} wait till already get
                    process, do not send to another person and trust anyone
                    claiming to represent {bannergetData?.gameall?.name}. Always
                    verify our website authenticity through the official
                    community channels. Your safety and trust is our prority.
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm  text-black">
                    Please be sure to always use our official website for
                    playing the games with the following link,{" "}
                    {bannergetData?.gameall?.name}. Please always check our
                    official link to access our website and avoid scammers and
                    phishing links
                  </h3>
                </div>
              </Slider>
            </div>

            <span className="float-end text-xl  relative mr-2">
              <button className="flex items-center blue-linear p-2 rounded-2xl px-3">
                <BsFire className="text-white mr-1 fs-sm" />{" "}
                <span className="text-white font-semibold fs-sm">Details</span>
              </button>

              {/* <div className="ponter-event"></div> */}
            </span>
          </div>
        </div>
      </div>

      {/* start here */}

      {/* <div>
        <div className="w-full h-20 ">
          <LotteryGameSection />
        </div>
      </div> */}

      {/* Lottery Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="border-after mt-2 color-l text-lg ">Lottery</h2>
              <button className="text-blue-600 text-xs  bg-white rounded items-center overflow-auto p-1   ">
                More 3
              </button>
            </div>
          </div>
          <div className="slider-container mt-1">
            <Slider {...settings}>
              <div>
                <div className="grid grid-cols-12 gap-2">
                  <div
                    className="col-span-4"
                    onClick={() => handleCheck("/WinGo")}
                  >
                    <img
                      src={img1}
                      alt=""
                      loading="lazy"
                      className="w-full  h-[150px]"
                    />
                  </div>
                  <div className="col-span-4" onClick={() => handleCheck("/k3")}>
                    <img
                      src={img2}
                      alt=""
                      loading="lazy"
                      className="w-full h-[150px]"
                    />
                  </div>
                  <div className="col-span-4" onClick={() => handleCheck("/5d")}>
                    <img
                      src={img3}
                      alt=""
                      loading="lazy"
                      className="w-full h-[150px]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4" onClick={() => handleCheck("/trx")}>
                    <img
                      src={img4}
                      alt=""
                      loading="lazy"
                      className="w-full h-[150px]"
                    />
                  </div>
                  <div className="col-span-4" onClick={handlGo}>
                    <img
                      src={OriginalImg1}
                      alt=""
                      loading="lazy"
                      className="w-full h-[150px] rounded-md"
                    />
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* slots Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section slots-game-sections">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={slotsSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Slots</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Slots")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Slots.length}
                </span>
              </div>
            </div>
          </div>
          <div className="slider-container mt-1">
            <Slider {...settings}>
              {SlotsGameData.map((item, i) => (
                <div key={i}>
                  {i === 0 ? (
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4">
                        <img
                          src={item?.Img1}
                          alt=""
                          className="w-full  h-full  "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Slots")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img2}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Crash")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img3}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=MG_Fish")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img4}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Rummy")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img5}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Jilli")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img6}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Casino")
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4">
                        <img
                          src={item?.Img1}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Rummy")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img2}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=Jilli")
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <img
                          src={item?.Img3}
                          alt=""
                          className="w-full  h-full "
                          onClick={() =>
                            navigate("/home/AllOnlineGames?game=MG_Fish")
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* <div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <img src={TrxImg} alt="" className="w-full" />
                </div>
              </div>
            </div> */}
            </Slider>
          </div>
        </div>
      </div>

      {/* original Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={OriginalSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                Original
              </h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Rummy")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {originalData?.length}
                </span>
              </div>
            </div>
          </div>
          <div className="slider-container mt-1">
            <Slider {...settings}>
              {originalData.map((item, i) => (
                <div key={i}>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <img
                        src={item?.Img1}
                        alt=""
                        className="w-full  h-[150px]   rounded-lg"
                        onClick={() => i === 0 && handleJilliOpen(224)}
                      />
                    </div>
                    <div className="col-span-4">
                      <img
                        src={item?.Img2}
                        alt=""
                        className="w-full  h-[150px]    rounded-lg"
                        onClick={() => i === 0 && handleJilliOpen(242)}
                      />
                    </div>
                    <div className="col-span-4">
                      <img
                        src={item?.Img3}
                        alt=""
                        className="w-full  h-[150px]   rounded-lg"
                        onClick={() => i === 0 && handleJilliOpen(235)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* <div>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <img src={TrxImg} alt="" className="w-full" />
                </div>
              </div>
            </div> */}
            </Slider>
          </div>
        </div>
      </div>

      {/* Hot  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={HotSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                Hot Games
              </h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Jilli")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  6
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {HotGameData.map((items, i) => (
                  <div className="col-span-4" key={i}>
                    <img
                      src={items?.Img}
                      alt=""
                      className="w-full h-full  rounded-lg"
                      onClick={() => {
                        i === 0 && handleJilliOpen(9);
                        i === 1 && handleJilliOpen(51);
                        i === 2 && handleJilliOpen(27);
                        i === 3 && handleJilliOpen(232);
                        i === 4 && handleJilliOpen(236);
                        i === 5 && handleJilliOpen(233);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* Casino  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Casino</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Casino")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Casino?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Casino.slice(0, 6).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(207);
                        index === 1 && handleJilliOpen(216);
                        index === 2 && handleJilliOpen(204);
                        index === 3 && handleJilliOpen(197);
                        index === 4 && handleJilliOpen(200);
                        index === 5 && handleJilliOpen(195);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* Fishiing  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                Fishing
              </h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=MG_Fish")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Fishing?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Fishing.slice(0, 3).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(882);
                        index === 1 && handleJilliOpen(212);
                        index === 2 && handleJilliOpen(119);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>
      {/* Crash  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Crash</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Crash")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Crash?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Crash.slice(0, 6).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(261);
                        index === 1 && handleJilliOpen(254);
                        index === 2 && handleJilliOpen(242);
                        index === 3 && handleJilliOpen(241);
                        index === 4 && handleJilliOpen(236);
                        index === 5 && handleJilliOpen(235);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>

      {/* Rummy  Games */}
      <div className="container-section mt-5">
        <div className="lottery-game-section">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={casinoSvg} alt="" />
              <h2 className="heading-h2 gray-color italic ml-1 mr-2">Rummy</h2>
              <div
                className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                onClick={() => navigate("/home/AllOnlineGames?game=Rummy")}
              >
                All{" "}
                <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                  {Rummy?.length}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-1">
              <img src={LeftSvg} alt="" />
              <img src={RightSvg} alt="" />
            </div>
          </div>
          <div className="slider-container mt-1">
            {/* <Slider {...settings}>           */}
            <div>
              <div className="grid grid-cols-12 gap-2">
                {Rummy.slice(0, 6).map((items, index) => (
                  <div className="col-span-4" key={index}>
                    <img
                      src={items}
                      alt=""
                      className="w-full  h-full  rounded-lg"
                      onClick={() => {
                        index === 0 && handleJilliOpen(253);
                        index === 1 && handleJilliOpen(220);
                        index === 2 && handleJilliOpen(211);
                        index === 3 && handleJilliOpen(231);
                        index === 4 && handleJilliOpen(221);
                        index === 5 && handleJilliOpen(219);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* <div></div> */}

            {/* </Slider> */}
          </div>
        </div>
      </div>


      <div className="container-section">
        <WinningInformation />

        <div className="mt-5">
          <div className="flex items-center mt-2  border-l-4 border-[var(--main-color)] text-sm mb-2">
            {" "}
            <h1 className="heading-h3 font-medium ml-1 text-black ">
              Today's earning chart
            </h1>
          </div>

          <div
            style={{ backgroundImage: `url(${EarningImg})` }}
            className="w-full mt-20 h-32 bg-cover "
          >
            <div className="flex items-center justify-around w-full">
              <div>
                <div className="relative top-[-20px]">
                  <img
                    src={Crown2}
                    alt=""
                    className="absolute w-12 left-[-20px] top-[-20px]"
                  />
                  <img
                    src={AvatarData[1]}
                    alt=""
                    loading="lazy"
                    className="w-14 rounded-full h-14"
                  />
                  <img
                    src={Place2}
                    alt=""
                    className="absolute bottom-[-10px]"
                  />
                </div>
                <div className="left-4 absolute">
                  <p className="fs-sm left-6 relative color-orange">Mem**SLH</p>
                  <button className=" fs-sm mt-1 font-semibold rounded-3xl p-1 px-2 bg-home-lg color-orange">
                    ₹220,499,518.82
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative  top-[-45px]">
                  <img
                    src={Crown1}
                    alt=""
                    className="absolute w-12 left-[-20px] top-[-20px]"
                  />
                  <img
                    src={AvatarData[4]}
                    alt=""
                    loading="lazy"
                    className="w-14 rounded-full h-14"
                  />
                  <img
                    src={Place1}
                    alt=""
                    className="absolute bottom-[-10px]"
                  />
                </div>
                <div className="left-[-25px] mt-[-20px] absolute">
                  <p className="fs-sm left-6 relative color-orange">Mem**FXI</p>
                  <button className=" fs-sm mt-1 font-semibold rounded-3xl p-1 px-2 bg-home-lg color-orange">
                    ₹1,272,332,040.00
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative top-[-20px]">
                  <img
                    src={Crown3}
                    alt=""
                    className="absolute w-12 left-[-20px] top-[-20px]"
                  />
                  <img
                    src={AvatarData[5]}
                    alt=""
                    loading="lazy"
                    className="w-14 rounded-full h-14"
                  />
                  <img
                    src={Place3}
                    alt=""
                    className="absolute bottom-[-10px]"
                  />
                </div>
                <div className="left-[-15px] absolute">
                  <p className="fs-sm left-6 relative color-orange">Mem**IAP</p>
                  <button className=" fs-sm mt-1 font-semibold rounded-3xl p-1 px-2 bg-home-lg color-orange">
                    ₹97,990,200.00
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-color-l flex py-1 items-center justify-between my-2 rounded-md">
              <div className="flex items-center ps-1">
                <h1 className="gray-100 w-14 flex justify-center">4</h1>
                <img
                  src={AvatarData[6]}
                  alt=""
                  className="rounded-full w-[40px] h-[40px] mr-2"
                />
                <p className="fs-sm gray-100">Mem***WJA</p>
              </div>
              <div className="relative flex items-center">
                <button className=" text-sm mt-1 font-bold rounded-3xl p-1 px-2 bg-home-lg color-orange mr-2">
                  ₹78,976,308.99
                </button>
              </div>
            </div>
            <div className="bg-color-l py-1 flex items-center justify-between my-2 rounded-md ">
              <div className="flex items-center ps-1">
                <h1 className="gray-100 w-14 flex justify-center">5</h1>
                <img
                  src={AvatarData[7]}
                  alt=""
                  className="rounded-full w-[40px] h-[40px] mr-2"
                />
                <p className="fs-sm gray-100">Mem***TCZ</p>
              </div>
              <div className="relative flex items-center">
                <button className=" text-sm mt-1 font-bold rounded-3xl p-1 px-2 bg-home-lg color-orange mr-2">
                  ₹61,692,960.00
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Tools */}

      <div>
        <BasicTools />
      </div>

      {/* Platform Details */}

      <div>
        <PlatformDetails />
      </div>

      {/* more menu */}

      <div className={topup ? "overlay-section block" : "hidden"}></div>
      <div className={topup2 ? "overlay-section block z-[55]" : "hidden"}></div>
      {topup && (
        <div className="absolute top-14 left-0 right-0 flex m-auto flex-col bg-color-l z-20 mx-8 pb-2 rounded-lg">
          <div className="blue-linear text-center p-2 font-bold text-base text-white rounded-t-xl">
            Notification
          </div>
          <div className=" py-2 font-medium  text-black text-[15px]">
            <span className=" text-black">
              {" "}
              🎰🎰Click to enter the channel to receive daily red envelope
              rewards🎁🎁{" "}
            </span>
            <br />
            🧧🧧🧧Channel link:❤️💚💰❤️💚
            <br />
            <span className="text-blue-500">
              https://t.me/{bannergetData?.gameall?.name}
            </span>
            <br />
            <img src="./first-ban.png" alt="" className="h-44 w-full" />
            <br />
            <span className=" text-black">
              {" "}
              🎰🎰Click to enter the channel to receive daily red envelope
              rewards🎁🎁{" "}
            </span>
            <br />
            🧧🧧🧧Channel link:❤️💚💰❤️💚
            <br />
            <span className="text-blue-500">
              https://t.me/{bannergetData?.gameall?.name}
            </span>
          </div>
          <button
            className="blue-linear flex justify-center  text-lg  w-52   m-auto font-semibold text-center  rounded-full p-1  tracking-widest text-white"
            onClick={handleTopup}
          >
            Confirm
          </button>
        </div>
      )}

      {topup2 && (
        <div id="popup" className="popup bg-color-l">
          <div className="header-section blue-linear text-white">
            <h4>Extra first deposit bonus</h4>
            <p>Each account can only receive rewards once</p>
          </div>
          <div className="middle-content-section">
            <ul>
              {depositBonus?.map((item, i) => (
                <li key={i} onClick={() => navigate("/wallet/Recharge")}>
                  <div className="first-c">
                    <p className="gray-50">
                      First deposit{" "}
                      <span className="color-blue">
                        {item.deposit.toLocaleString()}
                      </span>
                    </p>
                    <p className="color-blue">
                      +₹{item.bonus.toLocaleString()}.00
                    </p>
                  </div>
                  <p className="color-gray">
                    Deposit {item.deposit.toLocaleString()} for the first time
                    in your account and you can receive
                    {(item.deposit + item.bonus).toLocaleString()}
                  </p>
                  <div className="bottom-c">
                    <div className="slider-box border  ">
                      0/{item.deposit.toLocaleString()}
                    </div>
                    <button className="border fs-sm border-color-blue ">
                      Deposit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-section">
            <div>
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  className="hidden peer"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-[var(--main-color)] peer-checked:bg-[var(--main-color)]">
                  <svg
                    className={`w-4 h-4 text-white ${isChecked ? "block" : "hidden"
                      }`}
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
                <span className="gray-100 ms-2 mr-2 fs-sm cursor-pointer">
                  No more reminders today
                </span>
              </label>
            </div>
            <button
              className="activity blue-linear text-white"
              onClick={() => setTopup2(false)}
            >
              Activity
            </button>
          </div>
          <span onClick={() => setTopup2(false)}>
            <RxCrossCircled className="m-auto flex text-center absolute left-0 right-0 svg-white justify-center text-2xl mt-1 " />
          </span>
        </div>
      )}
      <Apkdownload />

      <div className={jilliPopup ? "overlay-section block" : "hidden"}></div>
      {jilliPopup && (
        <div className="fixed top-0 z-10 bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
          <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
          <p className="text-sm gray-100 mt-2">
            Are you sure you want to join the game?
          </p>

          <div className="w-full mt-5">
            <button
              className="bgs-blue-500 p-2 w-[50%]  rounded-bl-lg "
              onClick={() => setJilliPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue p-2 rounded-br-lg  w-[50%]"
              onClick={handleJilliSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;

const depositBonus = [
  {
    deposit: 100000,
    bonus: 5888,
  },
  {
    deposit: 50000,
    bonus: 2888,
  },
  {
    deposit: 10000,
    bonus: 488,
  },
  {
    deposit: 5000,
    bonus: 288,
  },
  {
    deposit: 1000,
    bonus: 188,
  },
  {
    deposit: 500,
    bonus: 108,
  },
  {
    deposit: 300,
    bonus: 48,
  },
];
