import React, { useCallback, useEffect, useState } from "react";
import { RxCross2, RxCrossCircled, RxDividerVertical } from "react-icons/rx";
import Logo from "../../assets/logo.png";
import "./home.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { TfiEmail } from "react-icons/tfi";
import Slider from "react-slick";

import { RiHome5Fill, RiVolumeUpFill } from "react-icons/ri";

import Layout from "../../layout/Layout";

import { MdEmail } from "react-icons/md";
import { FaGift } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bannerGet, userDetail } from "../../store/reducer/authReducer";
import debounce from "lodash/debounce";
import { IoIosArrowForward } from "react-icons/io";
import MainLoader from "../../components/MainLoader";

import PopularImg from "../../assets/tiranga/popular.png";
import PopularIcon from "../../assets/bdgimg/popularicon.png";
import LotteryIcon from "../../assets/bdgimg/lotteryicon.png";
import SlotsIcon from "../../assets/bdgimg/slotsicon.png";
import SportsIcon from "../../assets/bdgimg/slotsicon.png";
import CasinoIcon from "../../assets/bdgimg/casinoicon.png";
import RummyIcon from "../../assets/bdgimg/rummyicon.png";
import FishingIcon from "../../assets/bdgimg/fishing.png";
import OriginalIcon from "../../assets/bdgimg/originalicon.png";

import { AvatarData } from "../main/AvatarData";
import WinningInformation from "./WinningInformation";
import EarningImg from "../../assets/bdgimg/DailyProfitRank.png";

import Crown2 from "../../assets/tiranga/crown2.png";
import Place2 from "../../assets/tiranga/place2.png";
import Crown1 from "../../assets/tiranga/crown1.png";
import Place1 from "../../assets/tiranga/place1.png";
import Crown3 from "../../assets/tiranga/crown3.png";
import Place3 from "../../assets/tiranga/place3.png";

import Popular from "./Popular";
import Lotterys from "./Lotterys";
import Slots from "./Spots";
import Sports from "./Sports";
import Casino from "./Casino";
import Rummy from "./Rummy";
import Fishing from "./Fishing";
import Original from "./Original";
import { BsFire } from "react-icons/bs";
import Apkdownload from "./Apkdownload";
import ban3 from "../../assets/banner/SAVE_20250222_011628.jpg";
import ban4 from "../../assets/banner/homebanner4.png";
import ban1 from "../../assets/banner/SAVE_20250222_112554.jpg";
import ban2 from "../../assets/banner/SAVE_20250222_162908.jpg";


import {
  ArcadeGame,
  Bingo,
  CardGame,
  FishShooting,
  jdbslotimg,
  LiveGame,
} from "./Jdbimg";

import LeftSvg from "../../assets/left-arrow.svg";
import RightSvg from "../../assets/right-arrow.svg";

const casinoSvg = "https://i.ibb.co/ggyWWZR/casinosvg.png";

const Home = () => {
  const { userInfo, bannergetData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [topup, setTopup] = useState(false);
  const [topup2, setTopup2] = useState(false);
  const [mainLoader, setMainloader] = useState(false);
  const [apps, setApp] = useState(true);
  const [tabs, setTabs] = useState("Lottery");
  const [jdbgameId, setjdbGameId] = useState();
  const [gTypeId, setGtypeId] = useState();
  const [jilliPopup, setJilliPopup] = useState(false);
  const [jdbPopup, setJDBPopup] = useState(false);



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



  useEffect(() => {
    const data = localStorage.getItem("app");

    if (data === "closed") {
      // Check for the specific value you set
      setApp(false);
    } else {
      setApp(true);
    }
  }, []);

  useEffect(() => {
    // Function to handle when the page has fully loaded
    const handleLoad = () => {
      console.log("Loading complete.");
      setMainloader(false);
    };

    if (performance.getEntriesByType("navigation")[0].type === "navigate") {
      console.log("Loading started in a new tab...");
      setMainloader(true);
      setTimeout(() => {
        setMainloader(false);
      }, 1000);
      window.addEventListener("load", handleLoad);
    } else {
      setMainloader(false);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

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

  function handleOpen (data) {
    const currentUrl = window.location.origin;
    const url = `${currentUrl}/aviator`;
    window.open(url, "_blank");
  }

  const handleJDBOpen = (data, gType) => {
    setjdbGameId(data);
    setGtypeId(gType);
    setJDBPopup(true);
  };

  const openGameByIdJDB22 = () => {
    if (userInfo === undefined || userInfo === "") {
      navigate("/login");
    } else {
      var g_mobile = `113_${userInfo?.phone_user}`;

      let iv = "f1ab7cea8106a3e4";
      let key = "b4d70df8d5c2857c";
      let uid = g_mobile;
      let serverUrl = "https://jdbapi.codehello.site";
      let parent = "sxmapiz";
      let gType = `${gTypeId}`;
      let baseUrl = "https://sxm.in.net/jdb/post";
      let mType = jdbgameId;

      // console.log("href", g_mobile);
      // console.log("jdbgameId", jdbgameId);
      let href = `${baseUrl}?iv=${iv}&key=${key}&uid=${uid}&serverUrl=${serverUrl}&parent=${parent}&gType=${gType}&mType=${mType}`;
      setJDBPopup(false);
      window.location.href = href;
    }
  };

  return (
    <Layout>
      <div className="home-nav sticky top-0 z-10">
        <div className="home-nav flex items-center justify-between  px-3 py-1">
          <div className="flex items-center">
            <div className="logo">
              <img src={Logo} alt="" className="w-28" />
            </div>
          </div>
          <div className="flex items-center">
            <MdEmail className="color-l text-xl mr-1" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
            >
              <path
                fill="var(--main-color)"
                d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71M5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1"
              />
            </svg>
          </div>
        </div>
      </div>

      {mainLoader && <MainLoader />}

      {/* bannner */}
      <div className="container-section ">
        {/* {apps && (
          <div className="flex nav-bg items-center justify-between p-2">
            <p className="flex items-center "><RxCross2 onClick={handleCloseApp} /> <span className="fs-sm">downloadMobileApp</span></p>
            <a className="flex blue-linear fs-sm color-orange rounded p-1 px-2" download href="/app.apk">Download</a>
          </div>
        )} */}

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
                  src={ban1}
                  className="w-full rounded-md h-36"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full">
                <img
                  src={ban2}
                  className="w-full rounded-md h-36"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className="w-full">
                <img
                  src={ban3}
                  className="w-full rounded-md h-36"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full">
                <img
                  src={ban4}
                  className="w-full rounded-md h-36"
                  alt=""
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* notice board */}
          <div className="banner-notice bg-[var(--bgbody)] mt-3  rounded-full flex items-center justify-between">
            <RiVolumeUpFill className="text-xl color-l absolute" />

            <div className="slider-container h-10 ms-6 mr-2 overflow-hidden">
              <Slider {...notices}>
                <div>
                  <h3 className="text-sm">
                    Welcome to the edge betz! Greetings,
                    Gamers and Enthusiasts! The edge betz{" "}
                    is more than just a platform for gaming. We invite you to
                    join us, you'll find a variety of games, promo, bonus,
                    luxury gold awards, Register now and win.
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm">
                    If your deposit not receive, please send it directly to{" "}
                    edge betz Self-service Center{" "}
                    edge betz wait till already get
                    process, do not send to another person and trust anyone
                    claiming to represent edge betz. Always
                    verify our website authenticity through the official
                    community channels. Your safety and trust is our prority.
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm">
                    Please be sure to always use our official website for
                    playing the games with the following link,{" "}
                    edge betz. Please always check our
                    official link to access our website and avoid scammers and
                    phishing links
                  </h3>
                </div>
              </Slider>
            </div>

            <span className="float-end text-xl  relative mr-2">
              <button className="flex items-center blue-linear p-1 rounded-md px-3">
                <BsFire className="text-black mr-1 fs-sm" />{" "}
                <span className="text-black font-semibold fs-sm">Details</span>
              </button>

              {/* <div className="ponter-event"></div> */}
            </span>
          </div>
        </div>
      </div>

      {/* lottery tabs  */}
      <div className="container-section mt-5">
        <div className="grid grid-cols-10 gap-4">
          <a
            href="#popular"
            className="col-span-4 relative bg-home-lg rounded-lg h-24"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("popular")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Popular");
            }}
          >
            <img
              src={PopularIcon}
              alt=""
              className="absolute top-[-10px] left-4 w-24"
            />
            <p className="text-sm font-bold absolute left-2 bottom-2 black-2">
              Popular
            </p>
          </a>

          <a
            href="#lottery"
            className="col-span-3 relative bg-home-lg rounded-lg h-24"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("lottery")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Lottery");
            }}
          >
            <img
              src={LotteryIcon}
              alt=""
              className="absolute w-20 left-2 top-[-10px] "
            />
            <p className="text-sm  font-bold absolute left-2 bottom-2 black-2">
              Lottery
            </p>
          </a>
          <a
            href="#slots"
            className="col-span-3 relative bg-home-lg rounded-lg h-24"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("slots")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Slots");
            }}
          >
            <img
              src={SlotsIcon}
              alt=""
              className="absolute w-20 left-2 top-[-10px] "
            />
            <p className="text-sm  font-bold absolute left-2 bottom-2 black-2">
              Slots
            </p>
          </a>
        </div>

        <div className="grid grid-cols-12 gap-4 bg-home-lg rounded-lg py-1 mt-3 divide-x divide-gray-300 ...">
          <a
            href="#sports"
            className="col-span-4 relative rounded-lg h-20 flex justify-center items-center flex-col "
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("sports")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Sports");
            }}
          >
            <img src={SportsIcon} alt="" className="  w-16 " />
            <p className="text-sm  font-bold  black-2">Sports</p>
          </a>
          <a
            href="#jdb"
            className="col-span-4 relative  rounded-lg h-20 flex justify-center items-center flex-col"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("jdb")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("JDB");
            }}
          >
            <img src={CasinoIcon} alt="" className="  w-16" />
            <p className="text-sm  font-bold  black-2">JDB</p>
          </a>
          <a
            href="#rummy"
            className="col-span-4 relative  rounded-lg h-20 flex justify-center items-center flex-col"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("rummy")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Rummy");
            }}
          >
            <img src={RummyIcon} alt="" className="  w-16" />
            <p className="text-sm  font-bold  black-2">Rummy</p>
          </a>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-3">
          <a
            href="#fishing"
            className="col-span-6 relative bg-home-lg rounded-lg h-16 py-2 flex"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("fishing")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Fishing");
            }}
          >
            <img src={FishingIcon} alt="" className="w-14 ml-2" />
            <p className="text-sm  font-bold absolute right-2 bottom-2 black-2">
              Fishing
            </p>
          </a>
          <a
            href="#original"
            className="col-span-6 relative bg-home-lg rounded-lg h-16 flex py-2"
            onClick={(e) => {
              e.preventDefault(); // Prevent default hash change
              document
                .getElementById("original")
                ?.scrollIntoView({ behavior: "smooth" });
              setTabs("Original");
            }}
          >
            <img src={OriginalIcon} alt="" className="w-14 ml-2" />
            <p className="text-sm  font-bold absolute right-2 bottom-2 black-2">
              Original
            </p>
          </a>
        </div>
      </div>

      {/* Lottery Games */}
      <div className="container-section mt-5" id="popular">
        {tabs === "Popular" && (
          <div>
            <h4 className="border-after mt-2 color-l">Aviator</h4>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-4 bg-home-lg rounded-lg">
                <img
                  src={`https://client-int.qtlauncher.com/images/?id=SPB-aviator_en_US&type=logo-square&version=1611571971493&width=250&theme=dark`}
                  alt="aviator"
                  loading="lazy"
                  className="w-full rounded-lg p-1 h-[120px]"
                  onClick={() => handleOpen("aviator")}
                />
              </div>
            </div>
            <Popular />
          </div>
        )}

        {tabs === "Lottery" && (
          <div id="lottery">
            {" "}
            <Lotterys />{" "}
          </div>
        )}
        {tabs === "Slots" && (
          <div id="slots">
            {" "}
            <Slots />{" "}
          </div>
        )}
        {tabs === "Sports" && (
          <div id="sports">
            <Sports />
          </div>
        )}
        {tabs === "Casino" && <Casino />}
        {tabs === "Rummy" && (
          <div id="rummy">
            <Rummy />
          </div>
        )}
        {tabs === "Fishing" && (
          <div id="fishing">
            <Fishing />
          </div>
        )}
        {tabs === "Original" && (
          <div id="original">
            <Original />
          </div>
        )}
      </div>

      {/* jdb */}
      {tabs === "JDB" && (
        <div>
          {/* JDB Games */}
          {/* JDB Slot Games */}
          <div className="container-section mt-5">
            <div className="lottery-game-section">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={casinoSvg} alt="" />
                  <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                    JDB Slot Games
                  </h2>
                  <div
                    className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                    onClick={() => navigate("/home/JdbAllgame?game=slots")}
                  >
                    All{" "}
                    <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                      {jdbslotimg?.length}
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
                    {jdbslotimg.slice(0, 6).map((items, index) => (
                      <div className="col-span-4" key={index}>
                        <img
                          src={items.img}
                          alt=""
                          className="w-full  h-full  rounded-lg"
                          onClick={() => {
                            handleJDBOpen(items.gameId, items.gType);
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
          {/* JDB Fish Shooting Games */}
          <div className="container-section mt-5">
            <div className="lottery-game-section">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={casinoSvg} alt="" />
                  <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                    JDB Fish Shooting
                  </h2>
                  <div
                    className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                    onClick={() => navigate("/home/JdbAllgame?game=Shooting")}
                  >
                    All{" "}
                    <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                      {FishShooting?.length}
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
                    {FishShooting.slice(0, 6).map((items, index) => (
                      <div className="col-span-4" key={index}>
                        <img
                          src={items.img}
                          alt=""
                          className="w-full  h-full  rounded-lg"
                          onClick={() => {
                            handleJDBOpen(items.gameId, items.gType);
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
          {/* JDB Arcade  Games */}
          <div className="container-section mt-5">
            <div className="lottery-game-section">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={casinoSvg} alt="" />
                  <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                    JDB Arcade Game
                  </h2>
                  <div
                    className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                    onClick={() => navigate("/home/JdbAllgame?game=Arcad")}
                  >
                    All{" "}
                    <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                      {ArcadeGame?.length}
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
                    {ArcadeGame.slice(0, 6).map((items, index) => (
                      <div className="col-span-4" key={index}>
                        <img
                          src={items.img}
                          alt=""
                          className="w-full  h-full  rounded-lg"
                          onClick={() =>
                            handleJDBOpen(items.gameId, items.gType)
                          }
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

          {/* JDB Card  Games */}
          <div className="container-section mt-5">
            <div className="lottery-game-section">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={casinoSvg} alt="" />
                  <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                    JDB Card Game
                  </h2>
                  <div
                    className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                    onClick={() => navigate("/home/JdbAllgame?game=Card")}
                  >
                    All{" "}
                    <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                      {CardGame?.length}
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
                    {CardGame.slice(0, 6).map((items, index) => (
                      <div className="col-span-4" key={index}>
                        <img
                          src={items.img}
                          alt=""
                          className="w-full  h-full  rounded-lg"
                          onClick={() => {
                            handleJDBOpen(items.gameId, items.gType);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* </Slider> */}
              </div>
            </div>
          </div>
          {/* JDB Bingo Game Games */}
          <div className="container-section mt-5">
            <div className="lottery-game-section">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={casinoSvg} alt="" />
                  <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                    JDB Bingo Game
                  </h2>
                  <div
                    className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                    onClick={() => navigate("/home/JdbAllgame?game=Bingo")}
                  >
                    All{" "}
                    <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                      {Bingo?.length}
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
                    {Bingo.slice(0, 6).map((items, index) => (
                      <div className="col-span-4" key={index}>
                        <img
                          src={items.img}
                          alt=""
                          className="w-full  h-full  rounded-lg"
                          onClick={() => {
                            handleJDBOpen(items.gameId, items.gType);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* </Slider> */}
              </div>
            </div>
          </div>
          {/* JDB Live Game Games */}
          <div className="container-section mt-5">
            <div className="lottery-game-section">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={casinoSvg} alt="" />
                  <h2 className="heading-h2 gray-color italic ml-1 mr-2">
                    JDB Live Game
                  </h2>
                  <div
                    className=" nav-bg gray-100 rounded-md px-1 pl-2 py-[2px] text-sm cursor-pointer"
                    onClick={() => navigate("/home/JdbAllgame?game=LiveGame")}
                  >
                    All{" "}
                    <span className="bg-color-l color-blue-500 m-1 px-1 rounded-md">
                      {LiveGame?.length}
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
                    {LiveGame.slice(0, 6).map((items, index) => (
                      <div className="col-span-4" key={index}>
                        <img
                          src={items.img}
                          alt=""
                          className="w-full  h-full  rounded-lg"
                          onClick={() => {
                            handleJDBOpen(items.gameId, items.gType);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* </Slider> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={jdbPopup ? "overlay-section block" : "hidden"}></div>

      {jdbPopup && (
        <div className="fixed top-0 z-10 bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
          <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
          <p className="text-sm gray-100 mt-2">
            Are you sure you want to join the game?
          </p>

          <div className="w-full mt-5">
            <button
              className="bg-color-l2 p-2 w-[50%]  rounded-bl-lg "
              onClick={() => setJDBPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-home-lg  p-2 rounded-br-lg  w-[50%]"
              onClick={openGameByIdJDB22}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      <div className="container-section">
        <WinningInformation />

        <div className="mt-5">
          <div className="flex items-center mt-2  border-l-4 border-[var(--main-color)] text-sm mb-2">
            {" "}
            <h1 className="heading-h3 font-medium ml-1 ">
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
                    trx220,499,518.82
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
                    trx1,272,332,040.00
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
                    trx97,990,200.00
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
                  trx78,976,308.99
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
                  trx61,692,960.00
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* game text  */}
      {/* <div className="container-section">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="" loading="lazy" className="w-36 m-1" />
          <img src={Age} alt="" loading="lazy" className="m-1" />
          <img src={Telegram} alt="" loading="lazy" className="m-1" />
          <img src={Whatsapp} alt="" loading="lazy" className="m-1" />
        </div>

        <p className="text-white text-sm font-medium">
          Justice, and openness. We mainly operate fair lottery.The platform
          advocates fairness, blockchain games, live casinos, and slot machine
          games.{" "}
        </p>
        <br />
        <p className="text-sm font-medium">
          Blockchain games, live casinos,and slot machine Works with over 10,000
          online live game dealers and slot games, all verified fair games.
        </p>
      </div> */}

      {/* game notification section */}
      {/* <div className="container-section">
        <ul className="bg-light mt-5 rounded-md divide-y divide-slate-700 ..." >
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/home/Messages")}>
            <div className="flex items-center">
              <MdEmail className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Notification</span>
            </div>
            <div className="flex items-center">
              <h5 className="mr-2 bg-red-600  rounded-full w-5 h-5 flex items-center text-center justify-center  px-3">
                1
              </h5>
              <IoIosArrowForward className='text-sm font-thin gray-100' />
            </div>
          </li>
     
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/main/RedeemGift")}>
            <div className="flex items-center">
              <FaGift className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Gifts</span>
            </div>
            <div>
              <IoIosArrowForward className='text-sm font-thin gray-100' />
            </div>
          </li>
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/main/GameStats")}>
            <div className="flex items-center">
              <PiChartBarFill className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Games statistics</span>
            </div>
            <div>
              <IoIosArrowForward className='text-sm font-thin gray-100' />
            </div>
          </li>
          <li className="flex justify-between items-center p-3 py-4" onClick={() => navigate("/main/Language")}>
            <div className="flex items-center">
              <FaGlobe className="text-2xl text-[#5891f0]" />
              <span className="text-sm font-medium ml-2">Language</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">English</span>
              <IoIosArrowForward className='text-sm font-thin gray-100'
              />
            </div>
          </li>
        </ul>
      </div> */}

      {/* more menu */}

      <div className={topup ? "overlay-section block" : "hidden"}></div>
      <div className={topup2 ? "overlay-section block" : "hidden"}></div>
      {topup && (
        <div className="absolute top-20 left-0 right-0 flex m-auto flex-col bg-color-l z-20 mx-8 pb-5 rounded-lg">
          <div className="blue-linear text-center p-2 font-bold text-lg text-black rounded-t-lg">
            Notification
          </div>
          <div className="px-3 py-2 font-medium text-center text-[15px]">
            <span className="bg-yellow-300 text-black">
              ⭐️ {bannergetData?.gameall?.name} ⭐️
            </span>
            <br />
            <br />
            Please Remember To Use
            <br />
            <span className="text-blue-500">✅ Official Website</span>
            <br />
            To Check Latest Website List
            <br />
            <Link className="text-blue-500">✅ Official Telegram</Link> <br />
            <Link className="text-violet-700">
              ✅ Official Customer Service
            </Link>{" "}
            <br />
            <Link className="text-violet-700">✅ Official Agent Gold Even</Link>
            <br />
            <br />
            <br />
            <br />
            ⭐️ {bannergetData?.gameall?.name} Operating 5 Years+ <br />
            ⭐️ The Most Professional Game <br />
            ⭐️ High Quality Agen Benefits <br />
          </div>
          <button
            className="blue-linear flex justify-center  text-lg  w-52   m-auto font-semibold text-center  rounded-full p-1 mt-10 tracking-widest text-black"
            onClick={handleTopup}
          >
            Confirm
          </button>
        </div>
      )}

      {topup2 && (
        <div id="popup" className="popup bg-color-l">
          <div className="header-section nav-bg text-white">
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
                      +trx{item.bonus.toLocaleString()}.00
                    </p>
                  </div>
                  <p className="color-gray">
                    Deposit {item.deposit.toLocaleString()} for the first time
                    in your account and you can receive
                    {(item.deposit + item.bonus).toLocaleString()}
                  </p>
                  <div className="bottom-c">
                    <div className="slider-box border  border-color-slat">
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
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-[var(--bg-color-l)] peer-checked:bg-[var(--bg-color-l)]">
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
              className="activity blue-linear color-orange"
              onClick={() => setTopup2(false)}
            >
              Activity
            </button>
          </div>
          <span onClick={() => setTopup2(false)}>
            <RxCrossCircled className="m-auto flex text-center absolute left-0 right-0 justify-center text-2xl mt-4 " />
          </span>
        </div>
      )}
      <Apkdownload />
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
