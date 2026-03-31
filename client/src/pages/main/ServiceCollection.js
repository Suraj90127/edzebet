import React, { useEffect } from 'react';
import ServerBg from "../../assets/customerBg.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import LiveChatImg from "../../assets/liveChat.png";
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ServiceCollection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  useEffect(() => {
    // Function to load Tawk.to script
    const loadTawkScript = () => {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = 'https://embed.tawk.to/66dbff5150c10f7a00a534e8/1i75lqmf0';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.body.appendChild(s1);
    };

    // Function to remove Tawk.to script
    const removeTawkScript = () => {
      const tawkScript = document.querySelector('script[src="https://embed.tawk.to/66dbff5150c10f7a00a534e8/1i75lqmf0"]');
      if (tawkScript) {
        document.body.removeChild(tawkScript);
      }

      if (typeof Tawk_API !== 'undefined') {
        delete Tawk_API.onChatStarted;
      }
    };

    if (location.pathname === '/main/CustomerService/ServiceCollection') {
      loadTawkScript();

      const checkTawkLoaded = setInterval(() => {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.onChatStarted) {
          clearInterval(checkTawkLoaded);

          Tawk_API.onChatStarted(() => {
            // Navigate to another route when the chat is opened
            navigate('/your-next-target-route'); // Change this to your desired path
          });
        }
      }, 1000);

      return () => {
        clearInterval(checkTawkLoaded);
        removeTawkScript();
      };
    }

    return () => {
      removeTawkScript();
    };
  }, [location.pathname, navigate]);

  function handle(){
    navigate("/main/CustomerService", { replace: true }); // Navigate to the target route
  window.location.reload(); // Reload the page after navigating
  }

  return (
    <>
      <div className='blue-linear p-1 py-3 sticky top-0'>
        <div className="container-section flex items-center relative">
          <button className='absolute'>
            <Link onClick={handle}>
              <IoIosArrowBack className='text-xl' />
            </Link>
          </button>
          <h1 className='heading-h1 gray-50 text-center flex justify-center items-center m-auto'>
            Customer Service
          </h1>
        </div>
      </div>

      <div>
        <img src={ServerBg} alt="" />
      </div>

      <div className="container-section">
        <Link className='flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg' to="/main/CustomerService/ServiceCollection/problem">
          <div className='flex items-center'>
            <img src={LiveChatImg} className='w-8' alt="" />
            <span className='text-base gray-50 ms-2 font-sans font-medium'>
              Self Service Recharge & Withdrawal problem
            </span>
          </div>
          <div className='flex items-center'>
            <MdOutlineArrowForwardIos className='text-lg gay-100' />
          </div>
        </Link>

        <Link className='flex justify-between items-center mt-2 nav-bg p-3 py-4 rounded-lg' to={userInfo?.telegram}>
          <div className='flex items-center'>
            <img src={LiveChatImg} className='w-8' alt="" />
            <span className='text-base gray-50 ms-2 font-sans font-medium'>
              Other Problem
            </span>
          </div>
          <div className='flex items-center'>
            <MdOutlineArrowForwardIos className='text-lg gay-100' />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ServiceCollection;
