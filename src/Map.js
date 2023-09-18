import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  GoogleMap,
  Circle,
 
  Marker,
  MarkerClusterer,
 
  DirectionsRenderer,
} from "@react-google-maps/api";
import Distance from "./distance";
const Map = ({ agencies, initialCenter, initialZoom }) => {
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [directions, setDirections] = useState(null);
  // const [duration, setDuration] = useState('')
  const [directionsResponse, setDirectionsResponse] = useState(null);
  // const [distance, setDistance] = useState(null);

  const onMarkerClick = (agency) => {
    setSelectedAgency(agency);
    calculateDirections(agency);
    calculateRoute();
  };

  async function calculateRoute() {
    if (selectedAgency === null || selectedAgency === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: initialCenter,
      destination: selectedAgency,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  const calculateDirections = (agency) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          initialCenter.lat,
          initialCenter.lng
        ),
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

  const handleResetMap = () => {
    setSelectedAgency(null);
    setDirections(null);
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

  return (
    <div>
      {directions && <Distance leg={directions.routes[0].legs[0]} />}
      <button
        onClick={() => {
          mapRef.current.panTo(initialCenter);
          mapRef.current.setZoom(10);
        }}
        
      >
        Zoom out
      </button>
      {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> */}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "800px" }}
          center={initialCenter}
          zoom={initialZoom}
          options={options}
          onLoad={onLoad}
        >
          <Marker
            position={{ lat: initialCenter.lat, lng: initialCenter.lng }}
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

          <Circle
            center={initialCenter}
            radius={15000}
            options={closeOptions}
          />
          <Circle
            center={initialCenter}
            radius={30000}
            options={middleOptions}
          />
          <Circle center={initialCenter} radius={45000} options={farOptions} />
        </GoogleMap>
      {/* </LoadScript> */}

     
      <br />
    
      {/* {selectedAgency && (
        <p>Distance from {initialCenter.name} to {selectedAgency.name}: {distance} </p>
      )}
      {selectedAgency && (
        <p>Duration : {duration} </p>
      )} */}
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
