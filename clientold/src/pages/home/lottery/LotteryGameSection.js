'use client'

import { useState, useRef } from 'react'
import img1 from '../../../assets/MenuIcon/1.png'
import img2 from '../../../assets/MenuIcon/2.png'
import img3 from '../../../assets/MenuIcon/3.png'
import img4 from '../../../assets/MenuIcon/4.png'
import img5 from '../../../assets/MenuIcon/5.png'
import img6 from '../../../assets/MenuIcon/6.png'
import img7 from '../../../assets/MenuIcon/7.png'
import img8 from '../../../assets/MenuIcon/8.png'
import img9 from '../../../assets/MenuIcon/9.png'





export default function LotteryGameSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  const gameCategories = [
    { id: 1, name: 'PVC', image: img1 },
    { id: 2, name: 'Casino', image: img2 },
    { id: 3, name: 'Lottery', image: img3 },
    { id: 4, name: 'Slots', image: img4 },
    { id: 5, name: 'Super Jackpot', image: img5 },
    { id: 6, name: 'Hot Slots', image: img6 },
    { id: 7, name: 'Original', image: img7 },
    { id: 8, name: 'Fishing', image: img8 },
    { id: 9, name: 'Sports', image: img9 },
  ]

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleClick = (index) => {
    setActiveIndex(index)

    if (containerRef.current) {
      const container = containerRef.current
      const clickedItem = container.children[index]
      const containerWidth = container.offsetWidth
      const itemWidth = clickedItem.offsetWidth
      const itemOffset = clickedItem.offsetLeft
      const scrollTo = itemOffset - (containerWidth - itemWidth) / 2

      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="w-full py-2 px-4 mt-2">
      <div className="relative">
        {/* Items Container */}
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          ref={containerRef}
        >
          {gameCategories.map((category, index) => (
            <div
              key={category.id}
              className={`flex-shrink-0 flex flex-col items-center space-y-1 w-16 transition-all duration-300`}
              style={{
                filter: activeIndex !== index ? 'blur(0.5px)' : 'none', // 1px Blur = ~10%
              }}
            >
              <button
                onClick={() => handleClick(index)}
                className={`relative flex items-center justify-center
                h-12 w-14 mt-1 rounded-full transition-all duration-300
                ${
                  activeIndex === index
                    ? 'scale-105 bg-gradient-to-br from-blue-800/20 to-purple-800/20 border-2 border-transparent bg-clip-border'
                    : 'scale-100 bg-gradient-to-br from-blue-800/10 to-purple-800/10'
                }`}
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 rounded-full object-contain"
                />
              </button>

              {/* Name outside below the button */}
              <span
                className={`whitespace-nowrap overflow-ellipsis justify-center text-xs text-center m-2 ${
                  activeIndex === index ? 'text-blue-600 font-bold' : 'text-gray-600 font-sm'
                }`}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
