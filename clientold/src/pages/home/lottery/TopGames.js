import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Image Imports
import Game1Img from "../../../assets/NewImg/top games/top games/1.png";
import Game2Img from "../../../assets/NewImg/top games/top games/2.png";
import Game3Img from "../../../assets/NewImg/top games/top games/3.png";
import Game4Img from "../../../assets/NewImg/top games/top games/4.png";
import Game5Img from "../../../assets/NewImg/top games/top games/5.png";  
import Game6Img from "../../../assets/NewImg/top games/top games/6.png";
import Game7Img from "../../../assets/NewImg/top games/top games/7.png";
import Game8Img from "../../../assets/NewImg/top games/top games/8.png";
import Game9Img from "../../../assets/NewImg/top games/top games/9.png";
import Game10Img from "../../../assets/NewImg/top games/top games/10.png";
import Game11Img from "../../../assets/NewImg/top games/top games/11.png";
import Game12Img from "../../../assets/NewImg/top games/top games/12.png";
import Game13Img from "../../../assets/NewImg/top games/top games/13.png";
import Game14Img from "../../../assets/NewImg/top games/top games/14.png";
import Game15Img from "../../../assets/NewImg/top games/top games/15.png";
import Game16Img from "../../../assets/NewImg/top games/top games/16.png";
import Game17Img from "../../../assets/NewImg/top games/top games/17.png";
import Game18Img from "../../../assets/NewImg/top games/top games/18.png";

// arrow img
import Arrowleft from "../../../assets/sikkim icon/left.png";
import Arrowright from "../../../assets/sikkim icon/right.png";

const TopGames = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  const slides = [
    [
      { id: "1", img: Game1Img, route: "/game1" },
      { id: "2", img: Game2Img, route: "/game2" },
      { id: "3", img: Game3Img, route: "/game3" },
    ],
    [
      { id: "4", img: Game4Img, route: "/game4" },
      { id: "5", img: Game5Img, route: "/game5" },
      { id: "6", img: Game6Img, route: "/game6" },
    ],
    [
      { id: "7", img: Game7Img, route: "/game7" },
      { id: "8", img: Game8Img, route: "/game8" },
      { id: "9", img: Game9Img, route: "/game9" },
    ],
    [
      { id: "10", img: Game10Img, route: "/game10" },
      { id: "11", img: Game11Img, route: "/game11" },
      { id: "12", img: Game12Img, route: "/game12" },
    ],
    [
      { id: "13", img: Game13Img, route: "/game13" },
      { id: "14", img: Game14Img, route: "/game14" },
      { id: "15", img: Game15Img, route: "/game15" },
    ],
    [
      { id: "16", img: Game16Img, route: "/game16" },
      { id: "17", img: Game17Img, route: "/game17" },
      { id: "18", img: Game18Img, route: "/game18" },
    ],
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div>
      <div className="container-section mt-5 overflow-hidden relative">
        <div className="lottery-game-section">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="border-after mt-2 color-l text-lg">Top Games</h1>
              <p className="text-gray-500 text-xs mt-1">Recently played games</p>
            </div>

            {/* Slider Controls */}
            <div className="absolute top-0 right-0 mt-1 flex gap-1">
              <button onClick={prevSlide} className="p-0  ">
                <img
                  src={Arrowleft}
                  alt="Previous"
                  className="w-10 h-6" // Adjusting the size of the left arrow
                />
              </button>
              <button onClick={nextSlide} className="p-0">
                <img
                  src={Arrowright}
                  alt="Next"
                  className="w-10 h-6" // Adjusting the size of the right arrow
                />
              </button>
            </div>
          </div>

          {/* Manual Slider Section */}
          <div className="slider-container mt-5 overflow-hidden">
            {/* Slides */}
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex gap-2 min-w-full"
                >
                  {slide.map((item) => (
                    <div
                      key={item.id}
                      className="w-1/3"
                      onClick={() => navigate(item.route)}
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={`${item.id} Game`}
                          loading="lazy"
                          className="w-full h-[150px] rounded-md"
                        />
                      ) : (
                        <div className="w-full h-[150px] bg-gray-300 rounded-md flex items-center justify-center">
                          No Image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopGames;
