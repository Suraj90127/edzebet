import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Image imports
import Game1Img from "../../../assets/NewImg/superjackpot/109.png";
import Game2Img from "../../../assets/NewImg/superjackpot/22001.png";
import Game3Img from "../../../assets/NewImg/superjackpot/35.png";
import Game4Img from "../../../assets/NewImg/superjackpot/47.png";
import Game5Img from "../../../assets/NewImg/superjackpot/49.png";  // Added missing import for Game 5
import Game6Img from "../../../assets/NewImg/superjackpot/51.png";


// arrow img
import Arrowleft from "../../../assets/sikkim icon/left.png";
import Arrowright from "../../../assets/sikkim icon/right.png";



const cardData = [
  {
    id: 1,
    title: "MONEY COMING",
    amount: "₹100.00",
    image: Game1Img,
    multiplier: "20X",
    route: "/game1"
  },
  {
    id: 2,
    title: "AVIATOR",
    amount: "₹100.00",
    image: Game2Img,
    multiplier: "23.35X",
    route: "/game2"
  },
  {
    id: 3,
    title: "AVIATOR",
    amount: "₹100.00",
    image: Game3Img,
    multiplier: "39.65X",
    route: "/game3"
  },{
    id: 4,
    title: "AVIATOR",
    amount: "₹100.00",
    image: Game4Img,
    multiplier: "39.65X",
    route: "/game3"
  },{
    id: 5,
    title: "AVIATOR",
    amount: "₹100.00",
    image: Game5Img,
    multiplier: "39.65X",
    route: "/game3"
  },
  {
    id: 6,
    title: "AVIATOR",
    amount: "₹100.00",
    image: Game6Img,
    multiplier: "39.65X",
    route: "/game3"
  },
  // Add more cards if needed
];

const SuperJackpots = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null); // Create a ref for the slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    arrows: false, 
  };

  return (
    <div className="p-3 ">
      <div className="flex items-center justify-between mb-2 flex-wrap">
        <div className="flex items-start ">
        <h2 className="border-after mt-2 color-l text-lg">Super Jackpot</h2>
        </div>
        
        <div className="flex gap-2 mt-1 md:mt-0">
          <button 
            
            onClick={() => sliderRef.current.slickPrev()} // Navigate to previous slide
          >

<img
                  src={Arrowleft}
                  alt="Previous"
                  className="w-10 h-6" // Adjusting the size of the left arrow
                />
          </button>
          <button 
           
            onClick={() => sliderRef.current.slickNext()} // Navigate to next slide
          >
            <img
                  src={Arrowright}
                  alt="Next"
                  className="w-10 h-6" // Adjusting the size of the right arrow
                />
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 text-xs ">
        When you win a super jackpot, you will receive additional rewards
      </p>
      
      <p className="text-gray-600 mb-4 text-xs">
        Maximum bonus <span className="text-blue-600">₹500.00</span>
      </p>

      <div className="slider-container mt-4">
        <Slider ref={sliderRef} {...settings}>
          {cardData.map((card) => (
            <div key={card.id} className="rounded p-1 relative"> {/* Added padding for spacing */}
              {/* Ensure that multiplier is visible above the image */}
              <div 
                className="absolute top-1 left-1   px-2 py-1  text-sm z-10  bg-gradient-to-r from-pink-500 via-purple-500 to-purple-700 text-black p-6 rounded-lg overflow-hidden" // Added z-10 for visibility
              >
                {card.multiplier}
              </div>
              <img 
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="w-full h-48 rounded"
                onClick={() => navigate(card.route)} // Navigate on image click
              />
              <div className="bottom-0 left-0 right-0 bg-gradient-to-t p-4">
                <h3 className="text-black text-xs whitespace-nowrap overflow-ellipsis text-center object-fill">{card.title}</h3>
                <p className="text-blue-500 text-xs text-center">{card.amount}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SuperJackpots;
