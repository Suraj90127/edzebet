import React from "react";

import Img2 from "../../../assets/NewImg/PlatformD/1.svg";
import Img3 from "../../../assets/NewImg/PlatformD/phone.png";
import Img4 from "../../../assets/NewImg/PlatformD/2.svg";
import Img5 from "../../../assets/NewImg/PlatformD/3.svg";
import Img6 from "../../../assets/NewImg/PlatformD/4.png";
import Img7 from "../../../assets/NewImg/PlatformD/5.svg";
import Img8 from "../../../assets/NewImg/PlatformD/6.svg";
import { useDispatch, useSelector } from "react-redux";

// Array of partner data
const partners = [
  { name: "Microgaming", img: Img2 },

  { name: "Evolution", img: Img4 },
  { name: "JILI", img: Img5 },
  { name: "AG", img: Img6 },
  { name: "AG", img: Img7 },
  { name: "AG", img: Img8 },
];

const PlatformDetails = () => {
  const { userInfo, bannergetData } = useSelector((state) => state.auth);
  return (
    <div className="p-4 m-4 bg-white flex flex-col items-center rounded ">
      {/* Header */}
      <div className="flex space-x-3 gap-6 items-center w-full max-w-xl mb-6 ">
        <img
          src={bannergetData?.gameall?.logo} // Replace with Sikkim logo
          alt="Sikkim Logo"
          className=" h-9 mb-2"
        />
        <div className="flex items-center space-x-3">
          <span className="flex items-center justify-center w-14 h-14 rounded-full  text-red-500 font-bold text-lg border-red-500 border-4">
            18+
          </span>
        </div>
        <span className=" text-red-500   rounded-full font-semibold">
          <img
            src={Img3} // Replace with the actual path to your image
            alt="Icon"
            className="h-14 w-14 inline-block"
          />
        </span>
      </div>

      {/* Partners */}
      <div className="grid grid-cols-3 gap-6 mb-6 max-w-xl">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-blue-50 p-2 flex justify-center items-center  rounded-md"
          >
            <img src={partner.img} alt={partner.name} className="h-8 w-full " />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="text-xs text-black font-sm space-y-1 max-w-xl font-serif">
        <p>
          🔹 The platform advocates fairness, justice, and openness. We mainly
          operate fair lottery, blockchain games, live casinos, and slot machine
          games.
        </p>
        <p>
          🔹 {bannergetData?.gameall?.name} works with more than 10,000 online live game dealers and
          slot games, all of which are verified fair games.
        </p>
        <p>
          🔹 {bannergetData?.gameall?.name} supports fast deposit and withdrawal and looks forward to
          your visit.
        </p>
        <br />
        <p className="text-blue-600">
          Gambling can be addictive, please play rationally.
        </p>
        <p className="text-blue-600">
        {bannergetData?.gameall?.name} only accepts customers above the age of 18.
        </p>
      </div>
    </div>
  );
};

export default PlatformDetails;
