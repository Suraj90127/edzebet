import React from 'react'
import Wingo from "../../assets/bdgimg/wingo.png"
import K3 from "../../assets/bdgimg/k3.png"
import Fived from "../../assets/bdgimg/5d.png"
import { Link } from 'react-router-dom'
const Lotterys = () => {

    return (
        <>
            <h4 className='border-after mt-2 color-l'>
                Lottery
            </h4>



            <div className="grid grid-cols-12 gap-3 mt-3">
                <Link to={"/WinGo"} className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div>
                        <h3 className="black-2 text-base font-bold">Win Go</h3>
                        <p className="fs-sm   black-2 mt-2 font-semibold">Guess Number</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold">Green/Red/Violet to win</p>
                    </div>
                    <img src={Wingo} alt="" className="w-24 ml-2" />
                </Link>
                <Link to={"/k3"} className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
                    <div>
                        <h3 className="black-2 text-base font-bold">K3</h3>
                        <p className="fs-sm   black-2 mt-2 font-semibold">Guess Number</p>
                        <p className="fs-sm  black-2 mt-1 font-semibold">Big/Small/Odd/Even</p>
                    </div>
                    <img src={K3} alt="" className="w-24 ml-2" />
               </ Link>
                <Link to="/5d" className="col-span-12 relative  items-center justify-between  px-3 bg-home-lg rounded-3xl  flex"  >
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
