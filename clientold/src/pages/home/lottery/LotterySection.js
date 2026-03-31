// 'use client'

// import { useRef } from 'react'
// import { useRouter } from 'next/navigation' // Import useRouter for navigation in Next.js
// import Slider from 'react-slick'
// // import lottery images
// import img1 from '../../../assets/NewImg/lottery/1.png'
// import img2 from '../../../assets/NewImg/lottery/2.png'
// import img3 from '../../../assets/NewImg/lottery/3.png'
// import img4 from '../../../assets/NewImg/lottery/4.png'

// export default function LotterySection() {
//   const sliderRef = useRef(null)
//   const router = useRouter() // Initialize router for navigation

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false, // Hide default arrows
//   }

//   const handlePrev = () => {
//     if (sliderRef.current) sliderRef.current.slickPrev()
//   }

//   const handleNext = () => {
//     if (sliderRef.current) sliderRef.current.slickNext()
//   }

//   const handlGo = () => {
//     router.push('/original') // Define the missing `handlGo` function
//   }

//   return (
//     <div className="container-section mt-5">
//       <div className="lottery-game-section">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <h2 className="border-after mt-2 color-l text-lg">Lottery</h2>
//             <button className="text-blue-600 text-xs bg-white rounded items-center overflow-auto p-1">
//               More 3
//             </button>
//           </div>
//         </div>

//         {/* Slider with Scroll Buttons */}
//         <div className="slider-container mt-1 relative">
//           <button
//             className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg"
//             onClick={handlePrev}
//           >
//             ‹
//           </button>
//           <Slider ref={sliderRef} {...settings}>
//             <div>
//               <div className="grid grid-cols-12 gap-2">
//                 <div
//                   className="col-span-4 cursor-pointer"
//                   onClick={() => router.push('/WinGo')} // Replace navigate with router.push
//                 >
//                   <img src={img1} alt="WinGo" loading="lazy" className="w-full" />
//                 </div>
//                 <div
//                   className="col-span-4 cursor-pointer"
//                   onClick={() => router.push('/k3')} // Replace navigate with router.push
//                 >
//                   <img src={img2} alt="K3" loading="lazy" className="w-full" />
//                 </div>
//                 <div
//                   className="col-span-4 cursor-pointer"
//                   onClick={() => router.push('/5d')} // Replace navigate with router.push
//                 >
//                   <img src={img3} alt="5D" loading="lazy" className="w-full" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className="grid grid-cols-12 gap-2">
//                 <div
//                   className="col-span-4 cursor-pointer"
//                   onClick={() => router.push('/trx')} // Replace navigate with router.push
//                 >
//                   <img src={img4} alt="TRX" loading="lazy" className="w-full" />
//                 </div>
//                 <div
//                   className="col-span-4 cursor-pointer"
//                   onClick={handlGo} // Use defined `handlGo` function
//                 >
//                   <img
//                     src={img4}
//                     alt="Original"
//                     loading="lazy"
//                     className="w-full h-full rounded-md"
//                   />
//                 </div>
//               </div>
//             </div>
//           </Slider>
//           <button
//             className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg"
//             onClick={handleNext}
//           >
//             ›
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import img lottery
import img1 from '../../../src/assets/NewImg/lottery/1.png';
import img2 from '../../../src/assets/NewImg/lottery/2.png';
import img3 from '../../../src/assets/NewImg/lottery/3.png';
import img4 from '../../../src/assets/NewImg/lottery/4.png';


const LotterySection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  const slides = [
    [
      { id: "winGo", img: img1, route: "/WinGo" },
      { id: "k3", img: img2, route: "/k3" },
      { id: "5d", img: img3, route: "/5d" },
    ],
    [
      { id: "trx", img4: "", route: "/trx" },
      { id: "original", "img": "", route: "#" }, // Placeholder
    ],
  ];

  const handleGo = () => {
    console.log("Navigating to custom route...");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <div className="container-section mt-5 overflow-hidden relative">
        <div className="lottery-game-section">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <h1 className="border-after mt-2 color-l text-lg">PVC</h1>
                <button className="text-blue-600 text-xs bg-white rounded items-center p-1">
                  More 3
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Exquisite scenes and delicate graphics, play online with friends
              </p>
            </div>

            {/* Slider Controls */}
            <div className="absolute top-0 right-0 mt-1">
              <button
                onClick={prevSlide}
                className="bg-gray-700 text-white px-3 py-1 rounded-l-md"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="bg-gray-700 text-white px-3 py-1 rounded-r-md"
              >
                ❯
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
                  className="grid grid-cols-12 gap-2 min-w-full"
                >
                  {slide.map((item) => (
                    <div
                      key={item.id}
                      className="col-span-4"
                      onClick={() => navigate(item.route || "#")}
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

export default LotterySection;
