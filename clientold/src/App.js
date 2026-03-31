import React, { useCallback, useEffect, useState } from 'react';
import {  HashRouter as Router } from "react-router-dom";
import './App.css';
import AppComponent from './AppComponent';
import { connectWebSocket, isWebSocketConnected } from './connectWebSocket';
import changeFavicon from './changeFavicon';
import { useDispatch, useSelector } from 'react-redux';
import { bannerGet } from './store/reducer/authReducer';
;



function App() {

  const {bannergetData}=useSelector((state)=>state.auth)

const dispatch=useDispatch()
 const getData=useCallback(()=>{
    dispatch(bannerGet())
  },[dispatch])
  useEffect(()=>{
 
    getData()
  },[dispatch,getData])

  useEffect(() => {
    if (bannergetData?.gameall?.name) {
      document.title = bannergetData.gameall.name;
      changeFavicon(bannergetData?.gameall?.favicon);
    
 
    
      // Optionally revert to default on unmount
      return () => {
        changeFavicon(bannergetData?.gameall?.favicon);
      };
    }
  }, [bannergetData]);


  useEffect(() => {
  

    // Change to a specific favicon when the component mounts
  
  }, []);

  return (
    <>

<Router>
<AppComponent/>

    </Router>

    </>
  );
}

export default App;
