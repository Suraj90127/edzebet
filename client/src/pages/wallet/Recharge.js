import React, { Fragment, useEffect, useState } from "react";
import Wallet from "../../assets/balance.png";
import RefereshImg from "../../assets/refresh.png";
import { IoIosArrowBack, IoMdWallet } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import EWalletIcon from "../../assets/e-wallet.png";
import PaytmIcon from "../../assets/paytm.jpg";
import UpiIcon from "../../assets/upi.png";
import USDt1Img from "../../assets/usdt1.png";
import UsdtIcon from "../../assets/usdt.png";
import tron from "../../assets/tron.png";
import { GiSwipeCard, GiWhiteBook } from "react-icons/gi";
import { FaSquare } from "react-icons/fa";
import CopyCopmponent from "../../components/CopyCopmponent";
import {
  bannerGet,
  recharge,
  recharge2,
  recharge3,
  userDetail,
} from "../../store/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import AlertCopmponent from "../../components/AlertComponent";

export default function Recharge() {
  const { userInfo, loader, bannergetData } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Trx");
  const [activeTab2, setActiveTab2] = useState("P-pay");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyPopup, setCopyPopup] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [alertsuccess, setAlertsuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const tabs = [
    { label: "Trx", Icons: tron },
    // { label: "USDT", Icons: "" },
  ];

  const handleSubmit = async () => {
    const data = {
      amount: amount,
      type: "Trx",
    };

    dispatch(recharge(data)).then((res) => {
      setSuccessMessage(res.payload.message);
      if (res.payload.status) {
        setAlertsuccess(true);
        navigate("/wallet/Recharge/pay");
      } else {
        setAlerts(true);
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    });
  };

  const handleSubmitUSDT = async () => {
    const type = "USDT";
    const formData = new FormData();
    formData.append("amount", amount * 93);
    formData.append("type", type);
    dispatch(recharge(formData)).then((res) => {
      setSuccessMessage(res.payload.message);
      if (res.payload.status) {
        setAlertsuccess(true);
        navigate("/wallet/Recharge/usdt");
      } else {
        setAlerts(true);
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    });
  };

  const handleRefesh = () => {
    setCopyPopup(true);
    dispatch(userDetail());
    setTimeout(() => {
      setCopyPopup(false);
    }, 1500);
  };
  useEffect(() => {
    dispatch(userDetail());
    dispatch(bannerGet());
    setTimeout(() => {
      setAlerts(false);
      setAlertsuccess(false);
    }, 2000);
  }, [dispatch, userInfo?.length, successMessage, alerts, alertsuccess]);

  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0">
        <div className="container-section flex  items-center relative">
          <button className="absolute ">
            <Link to={"/wallet"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-50 text-center flex justify-center items-center m-auto">
            Deposit
          </h1>
          <p className="absolute right-1">
            <Link className="fs-sm gray-50" to={"/wallet/RechargeHistory"}>
              Deposit history
            </Link>
          </p>
        </div>
      </div>

      <div className="container-section mt-5  text-white ">
        <div className="total-img p-4">
          <div className="flex items-center">
            <img src={Wallet} alt="" className="w-4 mr-2 mb-[2px]" />
            <p className="fs-sm color-orange">Balance</p>
          </div>
          <div className="flex items-center ms-2 mt-2">
            <h3 className="heaing-h3 text-xl font-bold color-orange">
              trx{Number(userInfo?.money_user).toFixed(2)}
            </h3>
            <img
              src={RefereshImg}
              alt=""
              className="w-5 ms-2 mb-[2px]"
              onClick={handleRefesh}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 ">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`col-span-4 py-3 text-sm flex justify-center flex-col items-center rounded ${
                activeTab === tab.label
                  ? "blue-linear color-orange"
                  : "nav-bg gray-100"
              }`}
              onClick={() => {
                setActiveTab(tab.label); // Update the active tab
                setActiveIndex(0); // Reset index to 0
                const firstChannel = channels.find(
                  (channel) => channel.label === tab.label
                ); // Find the matching channel
                if (firstChannel && firstChannel.channelItem.length > 0) {
                  setActiveTab2(firstChannel.channelItem[0].label); // Update setActiveTab2 to the first item's label
                }
              }}
            >
              <img src={tab.Icons} alt="" className="w-14" />
              <span> {tab.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <>
            <div className="nav-bg  p-2 py-3 pb-5 rounded-lg hidden">
              <h2 className="text-lg mb-2 flex items-center gray-50">
                <GiSwipeCard className="color-blue border-b border-blue-500 mr-2" />{" "}
                Select channel
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {channels.map(
                  (channel, i) =>
                    activeTab === channel.label && (
                      <Fragment key={i}>
                        {channel.channelItem.map((item, index) => (
                          <div
                            key={index}
                            className={` p-2 rounded-md cursor-pointer ${
                              index === activeIndex
                                ? "blue-linear color-orange"
                                : "bg-grays"
                            } `}
                            onClick={() => {
                              setActiveTab2(item.label);
                              setActiveIndex(index);
                            }}
                          >
                            <p className={` text-base  `}>{item.label}</p>
                            <p className={`text-base  `}>
                              Balance: {item.balance}
                            </p>
                          </div>
                        ))}
                      </Fragment>
                    )
                )}
              </div>
            </div>
            {activeTab === "USDT" ? (
              <div className="nav-bg p-2 py-3 pb-5 mt-4 rounded-lg">
                <h2 className="text-lg mb-2 flex items-center gray-50">
                  <IoMdWallet className="color-blue text-lg mr-2" /> Select
                  amount of USDT
                </h2>
                <div className="grid grid-cols-12 gap-2">
                  {channels?.map((channel, i) => (
                    <Fragment key={i}>
                      {channel.channelItem.map(
                        (item, index) =>
                          activeTab2 === item.label && (
                            <Fragment key={index}>
                              {item.depositAmount.map((data, index2) => (
                                <button
                                  key={index2}
                                  className={`flex items-center justify-center col-span-4 p-1 rounded font-semibold  ${
                                    amount == data.am
                                      ? "blue-linear color-orange"
                                      : "border color-blue sky-border"
                                  }`}
                                  onClick={() => setAmount(data.am)}
                                >
                                  <img
                                    src={UsdtIcon}
                                    alt=""
                                    className="w-5 mr-2"
                                  />{" "}
                                  {data.am >= 1000
                                    ? `${data.am / 1000}k`
                                    : data.am}
                                </button>
                              ))}
                            </Fragment>
                          )
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="bg-body flex items-center px-5 py-1 rounded-lg mt-4">
                  <img src={UsdtIcon} alt="" className="w-5" />

                  <input
                    type="number"
                    className="w-full  bg-body  p-2  ps-6 flex items-center  focus:outline-none color-blue placeholder:text-sm placeholder:text-[var(--bgblue)]"
                    placeholder="Please enter deposit amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="bg-body flex items-center px-5 py-1 rounded-lg mt-3">
                  <span className="color-blue text-lg font-bold">trx</span>
                  <input
                    type="number"
                    className="w-full  bg-body  p-2  ps-6 flex items-center  focus:outline-none color-blue placeholder:text-sm placeholder:text-[var(--bgblue)]"
                    placeholder="Please enter USDT amount"
                    value={Number(Number(amount) * 4.35).toFixed(2)}
                    onChange={(e) => setAmount(e.target)}
                  />
                </div>

                <button
                  className={`  w-full rounded-full p-2 mt-4  ${
                    amount > 9
                      ? "blue-linear color-orange"
                      : "bg-gray-400 gray-50"
                  }`}
                  disabled={loader ? true : false}
                  onClick={handleSubmitUSDT}
                >
                  Deposit
                </button>
              </div>
            ) : (
              <div className="nav-bg p-2 py-3 pb-5 mt-4 rounded-lg">
                <h2 className="text-lg mb-2 flex items-center gray-50">
                  <IoMdWallet className="color-blue text-lg mr-2" /> Deposit
                  amount
                </h2>
                <div className="grid grid-cols-12 gap-2">
                  {channels?.map((channel, i) => (
                    <Fragment key={i}>
                      {channel.channelItem.map(
                        (item, index) =>
                          activeTab2 === item.label && (
                            <Fragment key={index}>
                              {item.depositAmount.map((data, index2) => (
                                <button
                                  key={index2}
                                  className={` col-span-4 p-1 rounded font-semibold  ${
                                    amount == data.am
                                      ? "blue-linear color-orange"
                                      : "border color-blue sky-border"
                                  }`}
                                  onClick={() => setAmount(data.am)}
                                >
                                  <span
                                    className={` mx-2 ${
                                      amount == data.am
                                        ? "text-white"
                                        : "gray-500"
                                    } `}
                                  >
                                    trx
                                  </span>{" "}
                                  {data.am >= 1000
                                    ? `${data.am / 1000}k`
                                    : data.am}
                                </button>
                              ))}
                            </Fragment>
                          )
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="bg-body flex items-center mt-4 px-5 py-1 rounded-full">
                  <span className="color-blue text-lg font-bold ">trx</span>{" "}
                  <span className="border-r border-[var(--bg-color-l)] ml-2 w-2 h-4"></span>
                  <input
                    type="number"
                    className="w-full  bg-body p-2  ps-6 flex items-center  focus:outline-none color-blue placeholder:text-sm placeholder:text-[var(--bgblue)]"
                    placeholder="Please enter the amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  className={`  w-full rounded-full p-2 mt-4  ${
                    amount > 99
                      ? "blue-linear color-orange"
                      : "bg-gray-400 gray-50"
                  }`}
                  disabled={loader ? true : false}
                  onClick={handleSubmit}
                >
                  Deposit
                </button>
              </div>
            )}
          </>
        </div>

        <div className="nav-bg mt-5 p-2 py-3 ">
          <h3 className="headinng-h3 flex gray-50 text-lg mb-2">
            <GiWhiteBook className="color-blue mt-[2px] mr-1 text-lg" />
            Recharge instructions
          </h3>
          <ul className="border border-[var(--bg-color-l)] p-3 rounded-lg">
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                If the transfer time is up, please fill out the deposit from
                again.
              </p>
            </li>
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                The transfer amount must match the order you created, otherwise
                the money cannot be credited successfully.
              </p>
            </li>
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                If you transfer the wrong amount, our company will not be
                responsible for the lost amount!
              </p>
            </li>
            <li className=" flex mt-2">
              <span>
                <FaSquare className="rotate-45 text-[7px] color-blue mr-2 mt-[2px]" />
              </span>
              <p className="text-sm gray-100 leading-[18px] ">
                Note: do not cancel the depsot order after the money has bess
                transferred.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <CopyCopmponent copyPopup={copyPopup} message="Refesh successfully" />

      <div className={`place-bet-popup ${alertsuccess ? "active" : ""}`}>
        <div className="text-sm">{successMessage}</div>
      </div>

      <AlertCopmponent alertPopup={alerts} message={successMessage} />
    </>
  );
}

const channels = [
  {
    label: "Trx",
    channelItem: [
      {
        label: "P-pay",
        balance: "100 - 50K",
        depositAmount: [
          {
            am: 100,
          },
          {
            am: 200,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },

          {
            am: 20000,
          },
          {
            am: 50000,
          },
          {
            am: 10000,
          },
        ],
      },

      {
        label: "LG-pay",
        balance: "100 - 50K",
        depositAmount: [
          {
            am: 100,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },

          {
            am: 20000,
          },
          {
            am: 50000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
        ],
      },

      {
        label: "Watch Pay",
        balance: "200 - 50K",
        depositAmount: [
          {
            am: 200,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
      {
        label: "Sgpay",
        balance: "100 - 50K",
        depositAmount: [
          {
            am: 100,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 20000,
          },
          {
            am: 50000,
          },
        ],
      },
    ],
  },

  {
    label: "USDT",
    channelItem: [
      {
        label: "Upay USDT",
        balance: "10 - 100K",
        depositAmount: [
          {
            am: 10,
          },
          {
            am: 500,
          },
          {
            am: 1000,
          },
          {
            am: 10000,
          },
          {
            am: 50000,
          },
          {
            am: 100000,
          },
        ],
      },
    ],
  },
];
