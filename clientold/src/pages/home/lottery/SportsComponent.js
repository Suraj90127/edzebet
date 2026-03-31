import React, { useRef } from "react";

import img1 from '../../../assets/NewImg/Sports/vendorlogo_202406201500542k79.png'
import img2 from '../../../assets/NewImg/Sports/vendorlogo_202406201501149ms9.png'
import img3 from '../../../assets/NewImg/Sports/vendorlogo_202406201521086f51.png'

const sportsData = [
  { id: 1, name: "Baseball", image:img1  },
  { id: 2, name: "Soccer", image: img2 },
  { id: 3, name: "Basketball", image: img3 },
  
];

const SportsComponent = () => {
  const sliderRef = useRef();

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200; // Adjust scroll distance
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center gap-2">
          <h2 className="border-after mt-2 color-l text-lg">Sports</h2>
          <button className="text-blue-600 text-xs  bg-white rounded items-center overflow-auto p-1   ">
          More 3 
                  </button>
          </div>
          <p className="text-gray-500 text-xs  mt-1">
            Latest sports events, rich gameplay
          </p>
        </div>
       
      </div>

      {/* Slider Controls */}
      <div className="relative">
        

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex space-x-4  overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {sportsData.map((sport) => (
            <div
              key={sport.id}
              className="min-w-[100px] max-w-[100px] flex-shrink-0 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-40  object-fill rounded-t-lg"
              />
              
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default SportsComponent;
