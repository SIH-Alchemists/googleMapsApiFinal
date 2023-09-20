import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
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
import Navbar from "./components/navbar";
const Map = ({ initialCenter, initialZoom }) => {
  
  const [directions, setDirections] = useState(null);
  const [currAgency, setCurrAgency] = useState(initialCenter);
  const [filters,setFilters] = useState([]);
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
  function generateRandomFilters() {
    const allFilters = ['earthquake', 'fire', 'floods'];
    const numFilters = Math.floor(Math.random() * allFilters.length) + 1; // Generate a random number of filters
    const randomFilters = [];
  
    for (let i = 0; i < numFilters; i++) {
      const randomIndex = Math.floor(Math.random() * allFilters.length);
      randomFilters.push(allFilters[randomIndex]);
    }
  
    return randomFilters;
  }
  const generateAgencies = (position, filters) => {
    const _agency = [];
    for (let i = 0; i < 60; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _agency.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
        // filters:['earthquake','fire','floods']
        filters: generateRandomFilters()
      });
    }
    const agencies = _agency.filter((agency) => {
      const distance = calculateDistance(
        currAgency.lat,
        currAgency.lng,
        agency.lat,
        agency.lng
      );
      // filters.map(ele=> console.log(ele))
      // console.log(agency)
      // console.log('filters are:',filters)
      // if(filters!==[]){
      //   let foundElement = agency.filters.find((element)=>{
      //     filters.map(ele=> ele === element)
      //   })
      //   if(foundElement===undefined){
      //     return false
      //   }
      // }
      // else
      return distance <= 45;
      // const passFilters = filters.every(filter => agency.filters.includes(filter));
      // return distance <= 30 && passFilters;
    });
    return agencies;
  };
 
  // const agencies = useMemo(() => generateAgencies(currAgency, filters), [currAgency, filters]);

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
    return filteredAgencies.map((agency, index) => (
      <Marker
        key={index}
        position={{ lat: agency.lat, lng: agency.lng }}
        // label={`${agency.name}`}
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
  const handleFilter=(e)=>{
    e.preventDefault();
    console.log(filters,filteredAgencies)
    // console.log(e.target.value)
  }

  const handleChange=(e)=>{
    let temp=filters
    
    if (e.target.checked) {
      temp=[...temp, e.target.value]
      // setFilters(
      //   [...temp, e.target.value]
      // );
    }
  
    // Case 2  : The user unchecks the box
    else {
      temp=temp.filter((data) => data !== e.target.value);
      // setFilters(
      //   temp.filter((data) => data !== e.target.value));
    }
    setFilters(temp);
    console.log(filters,filteredAgencies)
    filterAgencies(temp)
  }

  const [Agencies, setAgencies] = useState([]);
  const [filteredAgencies,setfilteredAgencies]= useState([]);
  useEffect(() => {
    const generatedAgencies = generateAgencies(currAgency);
    setAgencies(generatedAgencies);
    setfilteredAgencies(generatedAgencies);
  }, [currAgency]);
  const filterAgencies = (filters) => {
    const temp=Agencies.filter(agency => filters.every(filter => agency.filters.includes(filter)));
    console.log(filters,temp)
    if(temp===Agencies) console.log('same list')
    else console.log('different list')
    setfilteredAgencies(temp);

  };
  // const filteredAgencies = useMemo(() => filterAgencies(filters), [filters]);
  return (
    <>
    {/* <Navbar/> */}
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
        <div>
          <form name="form-content"  onSubmit={handleFilter} style={{'marginTop':'30%'}}>
          <h1>Filters</h1>
          <div style={{'textAlign':'center'}}>
          <h2>Type Of Disaster</h2>
            <input type="checkbox" id="disaster_1" value='earthquake' onChange={handleChange}/>
            <label for="disaster_1"> Earthquake</label>
            <br/><br/>
            <input type="checkbox" id="disaster_2" value='floods' onChange={handleChange}/>
            <label for="disaster_2"> Floods</label>
            <br/><br/>
            <input type="checkbox" id="disaster_3" value='fire' onChange={handleChange}/>
            <label for="disaster_3"> Fire</label>
            <br/><br/>
            {/* <button type="submit">Apply</button>
              */}
              <p id="txt">Number of agencies : {filteredAgencies.length}</p> 
              </div>
          </form>
        </div>
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
              filteredAgencies.map((agency) => (
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
    </>
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
