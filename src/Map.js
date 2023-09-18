import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  GoogleMap,
  Circle,
  Marker,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Distance from "./distance";
import "./index.css";
import Places from "./places";
const Map = ({ initialCenter, initialZoom }) => {
  
  const [directions, setDirections] = useState(null);
  const [currAgency, setCurrAgency] = useState(initialCenter);
 
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const options = useMemo(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

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
  const generateAgencies = (position) => {
    const _agency = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _agency.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    const agencies = _agency.filter((agency) => {
      const distance = calculateDistance(
        currAgency.lat,
        currAgency.lng,
        agency.lat,
        agency.lng
      );
      return distance <= 30;
    });
    return agencies;
  };
 
  const agencies = useMemo(() => generateAgencies(currAgency), [currAgency]);

  const calculateDirections = (agency) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(currAgency.lat, currAgency.lng),
        destination: new window.google.maps.LatLng(agency.lat, agency.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };
  const onMarkerClick = (agency) => {
    calculateDirections(agency);
  };
  

  const renderMarkers = () => {
    return agencies.map((agency, index) => (
      <Marker
        key={index}
        position={{ lat: agency.lat, lng: agency.lng }}
        label={`${agency.name}`}
        onClick={() => onMarkerClick(agency)}
      />
    ));
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrAgency({ lat: latitude, lng: longitude });
        setDirections(null);
        mapRef.current.panTo(currAgency);
        mapRef.current.setZoom(10);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  const handleResetMap = ()=>{
    setDirections(null);
    setCurrAgency(initialCenter);
    mapRef.current.panTo(initialCenter);
    mapRef.current.setZoom(10);
  }
  return (
    <div className="container">
      <div className="controls">
        <h1>Find nearby agencies</h1>
        <Places
          setAgency={(agency) => {
            setCurrAgency(agency);
            mapRef.current?.panTo(agency);
          }}
        />
        {!currAgency && <p>Enter the address of your agency.</p>}

        {directions && <Distance leg={directions.routes[0].legs[0]} />}


        <button
          onClick={() => {
            mapRef.current.panTo(currAgency);
            mapRef.current.setZoom(10);
          }}
          className="btn"
        >
          Zoom out
        </button>
        <button onClick={handleUseMyLocation} className="btn">Use My Location</button>
        <button
          onClick={handleResetMap}
          className="btn"
        >
       Reset Map
        </button>
      </div>
      <div className="map">
        <GoogleMap
          mapContainerClassName="map-container"
          center={currAgency}
          zoom={initialZoom}
          options={options}
          onLoad={onLoad}
        >
          <Marker
            position={{ lat: currAgency.lat, lng: currAgency.lng }}
            icon={{
              url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            }}
          />
          {renderMarkers()}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          <MarkerClusterer>
            {(clusterer) =>
              agencies.map((agency) => (
                <Marker
                  key={agency.lat}
                  position={agency}
                  clusterer={clusterer}
                  onClick={() => {
                    calculateDirections(agency);
                  }}
                />
              ))
            }
          </MarkerClusterer>

          <Circle center={currAgency} radius={15000} options={closeOptions} />
          <Circle center={currAgency} radius={30000} options={middleOptions} />
          <Circle center={currAgency} radius={45000} options={farOptions} />
        </GoogleMap>
      </div>

      <br />

    </div>
  );
};
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

export default Map;
