import * as React from 'react';

import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function Record() {
  

  return (

    <>
      <div className='nav-bg p-1 py-3'>
        <div className="container-section flex  items-center relative">
          <button className='absolute'><Link to={"/activity/DailyTasks"}>  <IoIosArrowBack className='text-xl' /></Link></button>
        <h1 className='heading-h1 gray-100 text-center flex justify-center text-lg items-center m-auto'>Recieve history</h1>
        </div>
      </div>
   
<div className="container-section task-record">

</div>
    </>
  );
}
