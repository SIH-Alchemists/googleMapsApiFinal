// App.js

import React,{useMemo} from 'react';
import Map from './Map'; // Adjust the import path

function App() {
  // Fetch agency data and calculate nearby agencies
  // Define your agency location (myLat, myLng) and nearbyAgencies array here
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }
  const myAgencyLocation = { lat: 18.528423, lng: 73.873863,name:"pune station" }; // pune station Replace with your agency's location
  // const agencies = [
  //   {lat: 18.457533, lng: 73.867744,name:"Katraj"},
  //   {lat: 18.499081, lng: 73.934174,name:"hadapsar"},
  //   {lat: 19.899290, lng: 75.319489,name:"aurangabad"},
  //   {lat: 18.526110, lng: 73.844131,name:"shivaji nagar"}
  // ]

  const generateAgencies = (position) => {
    const _houses = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _houses;
  };
  const newagencies = useMemo(() => generateAgencies(myAgencyLocation), [myAgencyLocation]);
  const nearbyAgencies = newagencies.filter((agency) => {
    const distance = calculateDistance(
      myAgencyLocation.lat,
      myAgencyLocation.lng,
      agency.lat,
      agency.lng
    );
    return distance <= 20; // 20km radius
  });
    
  return (
    <div>
      <Map agencies={nearbyAgencies} initialCenter={myAgencyLocation} initialZoom={10} />
    </div>
  );
}

export default App;



// process.env.REACT_APP_GOOGLE_MAPS_API_KEY