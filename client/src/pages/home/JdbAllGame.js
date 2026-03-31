import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import { MdSportsBasketball, MdSportsSoccer } from "react-icons/md";
import { PiApplePodcastsLogo, PiTelevisionSimpleFill } from "react-icons/pi";
import { BiHeartCircle } from "react-icons/bi";
import {
  GiArrowsShield,
  GiBarbedNails,
  GiCherish,
  GiCircularSaw,
  GiFishingLure,
  GiStarSwirl,
} from "react-icons/gi";
import { Casino, Crash, Fishing, Jilli, Rummy, Slots } from "./AllGameImg";
import {
  ArcadeGame,
  Bingo,
  CardGame,
  FishShooting,
  jdbslotimg,
  LiveGame,
} from "./Jdbimg";

import { jilliGame } from "../../store/reducer/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import { notification, rechargeList } from "../../store/reducer/authReducer";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  overflow: scroll;
  margin: 0 auto;
  position: relative;
  height: 60px;
`;

const Picker = styled.div`
  display: flex;
  align-items: center;
  transform: translateX(${(props) => props.translateX}px);
  transition: transform 0.3s ease-out;
  z-index: 2;
  position: absolute;
  overflow: hidden;
`;

const Item = styled.div`
  height: 50.67px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => (props.active ? "#fff" : "#606877")};
  transition: color 0.3s;
  cursor: pointer;
  font-weight: 700;
  width: 100px; /* Assuming each item has a width of 100px */
  margin: 10px;
  background: ${(props) =>
    props.active
      ? "var(--Gradient-1, linear-gradient(93deg, var(--mediam-blue) 7.38%, var(--bgblue) 94.48%))"
      : "var( --bg-color-l)"};
  padding: 10px 30px;
`;

const Span = styled.span`
  font-size: 24px;
`;

const JdbAllgame = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [openAll, setOpenAll] = useState(false);
  const [gameId, setGameId] = useState();
  const [alertsuccess, setAlertsuccess] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("game");
  const navigate = useNavigate();
  const [tab, setTabs] = useState(0);
  const [jdbgameId, setjdbGameId] = useState();
  const [gTypeId, setGtypeId] = useState();
  const [jdbPopup, setJDBPopup] = useState(false);
  const { userInfo, notificationData, rechargelistData } = useSelector(
    (state) => state.auth
  );

  // console.log("jdbslotimg", jdbslotimg);

  //   8273142996

  const items = [
    { name: "Shooting", icon: <MdSportsBasketball /> },
    { name: "Arcad", icon: <GiStarSwirl /> },
    {
      name: "Bingo",
      icon: <GiFishingLure />,
    },
    { name: "Card", icon: <BiHeartCircle /> },
    { name: "slots", icon: <PiApplePodcastsLogo /> },
    { name: "LiveGame", icon: <GiArrowsShield /> },
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
    setTabs(items[index].name);
  };

  useEffect(() => {
    // if (pickerRef.current) {
    //   const itemWidth = pickerRef.current.children[0].clientWidth;
    //   const newTranslateX = -(activeIndex * itemWidth);
    //   // Check if newTranslateX exceeds the limit of -420px
    //   if (newTranslateX < -250) {
    //     // setTranslateX(-250); // Set translateX to -420 if it exceeds
    //   } else if (newTranslateX > 0) {
    //     // setTranslateX(0); // Set translateX to 0 if it's greater than 0
    //   } else {
    //     setTranslateX(newTranslateX); // Otherwise, update translateX normally
    //   }
    // }
  }, [activeIndex]);

  useEffect(() => {
    setTabs(name);
    const index = items.findIndex((item) => item.name === name);
    setActiveIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleJDBOpen = (data, gType) => {
    setjdbGameId(data);
    setGtypeId(gType);
    setJDBPopup(true);
  };

  const openGameByIdJDB22 = () => {
    if (userInfo === undefined || userInfo === "") {
      navigate("/login");
    } else {
      var g_mobile = `111_${userInfo.phone_user}`;

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
  useEffect(() => {
    dispatch(notification());
    dispatch(rechargeList());
  }, []);

  return (
    <div>
      <div className={`place-bet-popup z-40 ${alertsuccess ? "active" : ""}`}>
        <div className="text-lg">{"Need first recharge to Play the Game"}</div>
      </div>
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex items-center">
          <button className="absolute">
            <Link to={"/"}>
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-50 text-center flex justify-center items-center m-auto">
            Game
          </h1>
        </div>
      </div>
      <Container className="scroll-none">
        <Picker className="">
          {items.map((item, index) => (
            <Item
              className="text-sm nav-bg rounded-md "
              key={index}
              active={index === activeIndex}
              onClick={() => handleClick(index)}
            >
              <Span>{item.icon}</Span>
              <p className="flex ">{item.name}</p>
            </Item>
          ))}
        </Picker>
        <div className="picker-bottom-highlight"></div>
      </Container>
      <div className="container-section">
        {/* ArcadeGame game */}
        {tab === "Arcad" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {ArcadeGame.map((items, index) => (
              <div className="col-span-4" key={index}>
                <img
                  src={items.img}
                  alt=""
                  className="w-full  h-full  rounded-lg"
                  onClick={() => handleJDBOpen(items.gameId, items.gType)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bingo game */}
        {tab === "Bingo" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {Bingo.map((items, index) => (
              <div className="col-span-4" key={index}>
                <img
                  src={items.img}
                  alt=""
                  className="w-full  h-full  rounded-lg"
                  onClick={() => handleJDBOpen(items.gameId, items.gType)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Card Game game */}
        {tab === "Card" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {CardGame.map((items, index) => (
              <div className="col-span-4" key={index}>
                <img
                  src={items.img}
                  alt=""
                  className="w-full  h-full  rounded-lg"
                  onClick={() => handleJDBOpen(items.gameId, items.gType)}
                />
              </div>
            ))}
          </div>
        )}
        {/* FishShooting game */}
        {tab === "Shooting" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {FishShooting.map((items, index) => (
              <div className="col-span-4" key={index}>
                <img
                  src={items.img}
                  alt=""
                  className="w-full  h-full  rounded-lg"
                  onClick={() => handleJDBOpen(items.gameId, items.gType)}
                />
              </div>
            ))}
          </div>
        )}
        {/* Slots game */}
        {tab === "slots" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {jdbslotimg.map((items, index) => (
              <div className="col-span-4" key={index}>
                <img
                  src={items.img}
                  alt=""
                  className="w-full  h-full  rounded-lg"
                  onClick={() => handleJDBOpen(items.gameId, items.gType)}
                />
              </div>
            ))}
          </div>
        )}
        {/* Live game */}
        {tab === "LiveGame" && (
          <div className="grid grid-cols-12 gap-3 mt-3">
            {LiveGame.map((items, index) => (
              <div className="col-span-4" key={index}>
                <img
                  src={items.img}
                  alt=""
                  className="w-full  h-full  rounded-lg"
                  onClick={() => handleJDBOpen(items.gameId, items.gType)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
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
              className="bg-home-lg p-2 rounded-br-lg  w-[50%]"
              onClick={openGameByIdJDB22}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JdbAllgame;
