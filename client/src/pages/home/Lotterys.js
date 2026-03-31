import React, { useState } from 'react'
import Wingo from "../../assets/bdgimg/wingo.png"
import K3 from "../../assets/bdgimg/k3.png"
import Fived from "../../assets/bdgimg/5d.png"
import { Link, useNavigate } from 'react-router-dom'
import { rechargeList } from '../../store/reducer/authReducer'
import { useDispatch } from 'react-redux'
const Lotterys = () => {
    const navigate = useNavigate()
    const [repopup, setRepoup] = useState(false);
    const dispatch = useDispatch();
    const handPath = async (params) => {
        dispatch(rechargeList()).then((res) => {
            if (res.payload.data2?.length == 0) {
                setRepoup(true);
            } else {
                navigate(params)
            }
        });
    }

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
                Lottery
            </h4>



            <div className="grid grid-cols-12 gap-3 mt-3">
                <Link onClick={() => handPath("/WinGo")} className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div>
                        <h3 className="black-2 text-base font-bold">Win Go</h3>
                        <p className="fs-sm   black-2 mt-2 font-semibold">Guess Number</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold">Green/Red/Violet to win</p>
                    </div>
                    <img src={Wingo} alt="" className="w-24 ml-2" />
                </Link>
                <Link onClick={() => handPath("/k3")} className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div>
                        <h3 className="black-2 text-base font-bold">K3</h3>
                        <p className="fs-sm   black-2 mt-2 font-semibold">Guess Number</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold">Big/Small/Odd/Even</p>
                    </div>
                    <img src={K3} alt="" className="w-24 ml-2" />
                </ Link>
                <Link onClick={() => handPath("/5d")} className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div>
                        <h3 className="black-2 text-base font-bold">5D</h3>
                        <p className="fs-sm   black-2 mt-2 font-semibold">Guess Number</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold">Big/Small/Odd/Even</p>
                    </div>
                    <img src={Fived} alt="" className="w-24 ml-2" />
                </Link>

            </div>
        </>
    )
}

export default Lotterys
