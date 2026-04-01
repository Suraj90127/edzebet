import React, { useCallback, useEffect, useState } from 'react'
import { platformData, fishingData } from "./AllgameData"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rechargeList, userDetail } from "../../store/reducer/authReducer";
import debounce from "lodash/debounce";
import { jilliGame } from "../../store/reducer/gameReducer"


const Fishing = () => {



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
    setJilliPopup(true);
    // dispatch(rechargeList()).then((res) => {
    //   if (res.payload.data2?.length == 0) {
    //     setRepoup(true);
    //   } else {
    //     setJilliPopup(true);
    //   }
    // });
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
        Fishing
      </h4>
      <div className="grid grid-cols-12 gap-3">
        {fishingData.map((items, i) => (
          <div className="col-span-4 bg-home-lg rounded-lg" key={i}>
            <img src={items} alt="" loading="lazy" className="w-full rounded-lg p-[1px] h-[110px]"

              onClick={() => {
                i === 0 && handleJilliOpen(1);

                i === 1 && handleJilliOpen(119);
                i === 2 && handleJilliOpen(20);
                i === 3 && handleJilliOpen(212);
                i === 4 && handleJilliOpen(32);
                i === 5 && handleJilliOpen(42);


                i === 6 && handleJilliOpen(60);
                i === 7 && handleJilliOpen(71);
                i === 8 && handleJilliOpen(74);
                i === 9 && handleJilliOpen(82);


              }}

            />
          </div>
        ))}
      </div>

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

export default Fishing
