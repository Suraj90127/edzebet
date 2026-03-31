import React, { useCallback, useEffect, useState } from 'react'
import { platformData, OriginalData } from "./AllgameData"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rechargeList, userDetail } from "../../store/reducer/authReducer";
import debounce from "lodash/debounce";
import { jilliGame } from "../../store/reducer/gameReducer"
const Original = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jilliPopup, setJilliPopup] = useState(false);
  const [gameId, setGameId] = useState();
  const [repopup, setRepoup] = useState(false);


  const debouncedDispatch = useCallback(
    debounce(() => {
      dispatch(userDetail());
    }, 300), // Adjust the debounce delay as needed
    [dispatch]
  );
  useEffect(() => {
    debouncedDispatch(); // Call the debounced dispatch function


  }, [debouncedDispatch]);

  const handleJilliOpen = (data) => {
    setGameId(data);
    dispatch(rechargeList()).then((res) => {
      if (res.payload.data2?.length == 0) {
        setRepoup(true);
      } else {
        setJilliPopup(true);
      }
    });
  };

  const handleJilliSubmit = () => {
    if (userInfo === undefined || userInfo === "") {
      navigate("/login");
    } else {

      if (userInfo?.isdemo == 0) {
        dispatch(jilliGame(gameId)).then((res) => {
          if (res.payload.status) {
            window.open(res.payload.data.url, "_blank");
            setJilliPopup(false);
          }
        });

      } else {

      }


    }
  };



  const handleCloseRecharge = () => {
    navigate("/wallet/Recharge");
    setRepoup(false);
  };

  return (
    <>
      <div className={repopup ? "overlay-section block z-10" : "hidden"}></div>

      {repopup && (
        <div className="fixed top-0 z-[20] bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
          <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
          <p className="text-sm gray-100 mt-2">
            First need to recharge for this game
          </p>

          <div className="w-full mt-5">
            <button
              className="bg-color-l2 border-r-2 p-2 w-[50%]  rounded-bl-lg "
              onClick={() => setRepoup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-home-lg p-2 rounded-br-lg  w-[50%]"
              onClick={handleCloseRecharge}
            >
              Confirm
            </button>
          </div>
        </div>
      )}


      <h4 className='border-after mt-2 color-l'>
        Mini games
      </h4>
      <div className="grid grid-cols-12 gap-3">
        {OriginalData.map((items, index) => (
          <div className="col-span-4 bg-home-lg rounded-lg" key={index}>
            <img src={items} alt="" loading="lazy" className="w-full rounded-lg  h-[110px]"
              onClick={() => {
                index === 0 && handleJilliOpen(224);
                index === 1 && handleJilliOpen(224);
                index === 2 && handleJilliOpen(241);
                index === 3 && handleJilliOpen(229);
                index === 4 && handleJilliOpen(225);
                index === 5 && handleJilliOpen(224);

                index === 6 && handleJilliOpen(72);
                index === 7 && handleJilliOpen(263);
                index === 8 && handleJilliOpen(85);


                index === 9 && handleJilliOpen(62);
                index === 10 && handleJilliOpen(233);
                index === 11 && handleJilliOpen(229);
                index === 12 && handleJilliOpen(62);
                index === 13 && handleJilliOpen(242);
                index === 14 && handleJilliOpen(229);
                index === 15 && handleJilliOpen(233);
                index === 16 && handleJilliOpen(297);
                index === 17 && handleJilliOpen(229);
                index === 18 && handleJilliOpen(197);
                index === 19 && handleJilliOpen(224);
                index === 20 && handleJilliOpen(229);
                index === 21 && handleJilliOpen(232);
                index === 22 && handleJilliOpen(233);
                index === 23 && handleJilliOpen(235);
                index === 24 && handleJilliOpen(236);

              }}

            />
          </div>
        ))}
      </div>


      <div className={jilliPopup ? "overlay-section block" : "hidden"}></div>

      {jilliPopup && (
        <div className="fixed top-0 z-10 bottom-0 h-32 m-auto flex flex-col justify-center items-center left-0 right-0 w-[20rem] nav-bg rounded-lg">
          <h3 className="heading-h3 gray-50 mt-5">Tips</h3>
          <p className="text-sm gray-100 mt-2">
            Are you sure you want to join the game?
          </p>

          <div className="w-full mt-5">
            <button
              className="bg-color-l2 p-2 w-[50%]  rounded-bl-lg "
              onClick={() => setJilliPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-home-lg p-2 rounded-br-lg  w-[50%]"
              onClick={handleJilliSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

    </>
  )
}

export default Original
