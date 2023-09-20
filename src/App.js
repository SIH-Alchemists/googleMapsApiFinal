// App.js

import React,{useMemo} from 'react';
import Map from './Map'; // Adjust the import path
import {
  useLoadScript
} from '@react-google-maps/api'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
function App() {
  

  
  
  const myAgencyLocation =  { lat: 18.528423, lng: 73.873863,name:"pune station" }; // pune station Replace with your agency's location
  
  // const agencies = [
  //   {lat: 18.457533, lng: 73.867744,name:"Katraj"},
  //   {lat: 18.499081, lng: 73.934174,name:"hadapsar"},
  //   {lat: 19.899290, lng: 75.319489,name:"aurangabad"},
  //   {lat: 18.526110, lng: 73.844131,name:"shivaji nagar"}
  // ]

  const [ libraries ] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/maps" element={ <Map initialCenter={myAgencyLocation} initialZoom={10} />} />
      <Route path="/" element={ <Home/>} />
    </Routes>
  </BrowserRouter>
    {/* <div>
     
      
    </div> */}
    </>
  );
}

export default App;






