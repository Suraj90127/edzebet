import React, { useState, useRef } from "react";

// Image imports
import img1 from "../../../assets/NewImg/casino/casino/1/1.png";
import img2 from "../../../assets/NewImg/casino/casino/1/2.png";
import img3 from "../../../assets/NewImg/casino/casino/1/3.png";
import img4 from "../../../assets/NewImg/casino/casino/1/4.png";
import img5 from "../../../assets/NewImg/casino/casino/1/5.png";
import img6 from "../../../assets/NewImg/casino/casino/1/5.png";

import img21 from "../../../assets/NewImg/casino/casino/2/1.png";
import img22 from "../../../assets/NewImg/casino/casino/2/2.png";
import img23 from "../../../assets/NewImg/casino/casino/2/3.png";
import img24 from "../../../assets/NewImg/casino/casino/2/4.png";
import img25 from "../../../assets/NewImg/casino/casino/2/5.png";
import img26 from "../../../assets/NewImg/casino/casino/2/5.png";

import img31 from "../../../assets/NewImg/casino/casino/3/1.png";
import img32 from "../../../assets/NewImg/casino/casino/3/2.png";
import img33 from "../../../assets/NewImg/casino/casino/3/3.png";
import img34 from "../../../assets/NewImg/casino/casino/3/4.png";
import img35 from "../../../assets/NewImg/casino/casino/3/5.png";
import img36 from "../../../assets/NewImg/casino/casino/3/5.png";

import img41 from "../../../assets/NewImg/casino/casino/4/1.png";
import img42 from "../../../assets/NewImg/casino/casino/4/2.png";
import img43 from "../../../assets/NewImg/casino/casino/4/3.png";
import img44 from "../../../assets/NewImg/casino/casino/4/4.png";
import img45 from "../../../assets/NewImg/casino/casino/4/5.png";
import img46 from "../../../assets/NewImg/casino/casino/4/5.png";

// White icon imports
import whiteIcon1 from "../../../assets/NewImg/slotsicons/white/evo video icon.png";
import whiteIcon2 from "../../../assets/NewImg/slotsicons/white/DG ICON WHITE.png";
import whiteIcon3 from "../../../assets/NewImg/slotsicons/white/sexy video WHITE.png";
import whiteIcon4 from "../../../assets/NewImg/slotsicons/white/mg video WHITE.png";

// Black icon imports
import blackIcon1 from "../../../assets/NewImg/slotsicons/black/evo video grey icon.png";
import blackIcon2 from "../../../assets/NewImg/slotsicons/black/DG ICON.png";
import blackIcon3 from "../../../assets/NewImg/slotsicons/black/sexy video.png";
import blackIcon4 from "../../../assets/NewImg/slotsicons/black/mg fish icon.png";

const slotCategories = [
  { name: "EVO_Video", whiteIcon: whiteIcon1, blackIcon: blackIcon1, id: "jili" },
  { name: "DG", whiteIcon: whiteIcon2, blackIcon: blackIcon2, id: "cq9" },
  { name: "SEXY_Video", whiteIcon: whiteIcon3, blackIcon: blackIcon3, id: "jdb" },
  { name: "MG_Video", whiteIcon: whiteIcon4, blackIcon: blackIcon4, id: "mg" },
];


const slotGames = {
  jili: [
    { name: "1", image: img1 },
    { name: "2", image: img2 },
    { name: "3", image: img3 },
    { name: "4", image: img4 },
    { name: "5", image: img5 },
    { name: "6", image: img6 },
  ],
  cq9: [
    { name: "1", image: img21 },
    { name: "2", image: img22 },
    { name: "3", image: img23 },
    { name: "4", image: img24 },
    { name: "5", image: img25 },
    { name: "6", image: img26 },
  ],
  jdb: [
    { name: "1", image: img31 },
    { name: "2", image: img32 },
    { name: "3", image: img33 },
    { name: "4", image: img34 },
    { name: "5", image: img35 },
    { name: "6", image: img36 },
  ],
  mg: [
    { name: "1", image: img41 },
    { name: "2", image: img42 },
    { name: "3", image: img43 },
    { name: "4", image: img44 },
    { name: "5", image: img45 },
    { name: "6", image: img46 },
  ],
};

const CasinoSection = () => {
  const [activeCategory, setActiveCategory] = useState("jili");
  const [showMore, setShowMore] = useState(false);
  const categoryRef = useRef();

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    setShowMore(false);

    const categoryElement = categoryRef.current.querySelector(
      `button[data-id="${id}"]`
    );
    if (categoryElement) {
      categoryElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      }
    );
    }
  };

  const gamesToShow = showMore
    ? slotGames[activeCategory]
    : slotGames[activeCategory].slice(0, 6);

  return (
    <div className="container-section mt-5">
      <div className="mb-4">
        <h1 className="border-after mt-2 color-l text-lg">Casino</h1>
        <p className="text-gray-500 text-xs mt-1">
          Online real-time game dealers, all verified fair games
        </p>
      </div>

      <div className="slider-container relative ">
      <div ref={categoryRef} className="flex overflow-x-auto scrollbar-hidden">
  {slotCategories.map((category, index) => (
    <button
      key={index}
      data-id={category.id}
      onClick={() => handleCategoryClick(category.id)}
      className={`flex flex-col items-center whitespace-nowrap px-3 py-1 rounded ${
        activeCategory === category.id
          ? "bg-gradient-to-b from-[#434FEE] to-[#4183F8]  text-white shadow-lg"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      <img
        src={
          activeCategory === category.id
            ? category.whiteIcon
            : category.blackIcon
        }
        alt={`${category.name} icon`}
        className="w-16 h-10 p-2 object-fill "
      />
      <span
        className={` text-sm   ${
          activeCategory === category.id ? "text-white" : "text-gray-700"
        }`}
      >
        {category.name}
      </span>
    </button>
  ))}
</div>


      </div>

      <div className="games-grid mt-6 grid grid-cols-3 gap-2 px-1">
        {gamesToShow.map((game, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <img
              src={game.image}
              alt={`Game ${game.name}`}
              className="w-full h-full rounded-md mb-2 object-fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasinoSection;
