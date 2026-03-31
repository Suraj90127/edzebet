import React, { useCallback, useEffect, useState } from 'react'
import { platformData, popularData } from "./AllgameData"

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../store/reducer/authReducer";
import debounce from "lodash/debounce";
import { jilliGame, openSpribeGame, spibeGame } from "../../store/reducer/gameReducer"

const SpribeGame = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { spibeGameData } = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jilliPopup, setJilliPopup] = useState(false);
    const [gameId, setGameId] = useState();


    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(userDetail());
            dispatch(spibeGame());
        }, 300), // Adjust the debounce delay as needed
        [dispatch]
    );
    useEffect(() => {
        debouncedDispatch(); // Call the debounced dispatch function


    }, [debouncedDispatch]);


    const handleJilliOpen = (data) => {
        setGameId(data);
        setJilliPopup(true);
    };

    const handleJilliSubmit = () => {

        if (userInfo === undefined || userInfo === "") {
            navigate("/login");
        } else {

            if (userInfo?.isdemo == 0) {
                dispatch(openSpribeGame(gameId)).then((res) => {
                    console.log("gameUrl", res.payload)
                    if (res.payload.status) {
                        const url = res.payload.data.gameUrl;
                        window.location.href = url;
                        setJilliPopup(false);
                    }
                });

            } else {

            }


        }
    };


    const arrayData = [
        {
            "id": "SPB-aviator",
            "name": "Aviator",
        },
        {
            "id": "SPB-dice",
            "name": "Dice",
        },
        {
            "id": "SPB-hilo",
            "name": "Hilo",
        },
        {
            "id": "SPB-goal",
            "name": "Goal",
        },
        {
            "id": "SPB-goal",
            "name": "Goal",
        },
        {
            "id": "SPB-keno",
            "name": "Keno",
        },
        {
            "id": "SPB-mines",
            "name": "Mines",
        },
        {
            "id": "SPB-miniroulette",
            "name": "Mini Roulette",
        },
        {
            "id": "SPB-plinko",
            "name": "Plinko",
        },

    ]



    return (
        <>

            <h4 className='border-after mt-2 color-l'>
                Spribe game
            </h4>
            <div className="grid grid-cols-12 gap-3">
                {arrayData?.map((items, i) => (
                    <div className="col-span-4 bg-home-lg rounded-lg" key={i}>
                        <img
                            src={`https://client-int.qtlauncher.com/images/?id=${items.id}_en_US&type=logo-square&version=1611571971493&width=250&theme=dark`}

                            alt={items.name} loading="lazy" className="w-full rounded-lg p-1 h-[120px]"

                            onClick={() =>
                                handleJilliOpen(items.id)
                            }

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

export default SpribeGame
