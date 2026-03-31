import React from "react";

import img1 from '../../../assets/NewImg/recmended/recmended/1/1.png'
import img2 from '../../../assets/NewImg/recmended/recmended/1/2.png'
import img3 from '../../../assets/NewImg/recmended/recmended/1/3.png'
import img4 from '../../../assets/NewImg/recmended/recmended/1/4.png'
import img5 from '../../../assets/NewImg/recmended/recmended/1/5.png'
import img6 from '../../../assets/NewImg/recmended/recmended/1/6.png'

const RecommendedGameData = [
  { Img: img1, title: "Aviator" },
  { Img: img2, title: "Aviator 1 Min" },
  { Img:img3 , title: "Cricket" },
  { Img:img4 , title: "Balls" },
  { Img:img5 , title: "Boom" },
  { Img:img6 , title: "Detail" },
];

const RecommendedGame = () => {
  return (
    <div className=" mt-0">
      <div className="recommended-game-section">
        {/* Header Section */}
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center">
            <h1 className="border-after mt-2 color-l text-lg">Recommended</h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs px-4 mt-1 ">
          Our team handpicks the best games for you. Fun, exciting, and ready to play!
        </p>

        {/* Game Grid */}
        <div className="slider-container mt-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 px-4">
            {RecommendedGameData.map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-100 shadow-md overflow-hidden"
              >
                <img
                  src={item.Img}
                  alt={item.title}
                  className="w-full h-[200px] object-fill"
                />
                {/* <div className="text-center py-2">
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedGame;
