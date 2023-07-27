import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '780px',
  position: 'relative',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '4px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  zIndex: 1,
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  fontSize: '16px',
  color: '#fff',
  borderRadius: '4px',
  cursor: 'pointer',
};

const greenButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'green',
};

const redButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'red',
};

const GoogleMapWithMarker = ({ apiKey }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [enableGPS, setEnableGPS] = useState(true);
  const [roofCoordinates, setRoofCoordinates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [roofArea, setRoofArea] = useState(null);

  // Ref to access Google Maps map instance
  const mapRef = useRef(null);

  useEffect(() => {
    // Function to get the user's current location using Geolocation API
    const getCurrentLocation = () => {
      if (navigator.geolocation && enableGPS) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        setCurrentPosition(null); // If GPS is disabled, clear the current location
      }
    };

    getCurrentLocation(); // Call the function to get the current location

    // Periodically update the current location every 10 seconds
    const intervalId = setInterval(getCurrentLocation, 10000);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, [enableGPS]);

  const handleMarkerClick = (e) => {
    // Log the coordinates of the clicked marker (rooftop)
    console.log('Rooftop Coordinates:', e.latLng.toJSON());
  };

  const handleMapClick = (e) => {
    setRoofCoordinates((prevCoordinates) => [...prevCoordinates, e.latLng.toJSON()]);
  };

  const calculateRooftopArea = () => {
    if (roofCoordinates.length < 3) {
      console.error('A minimum of three points is required to calculate the area.');
      return;
    }

    const area = window.google.maps.geometry.spherical.computeArea(
      roofCoordinates.map((coord) => new window.google.maps.LatLng(coord.lat, coord.lng))
    );

    setRoofArea(area.toFixed(2));
    setModalOpen(true);
    setRoofCoordinates([]); // Clear the selected building after finding the area
  };

  const handleToggleGPS = () => {
    setEnableGPS((prev) => !prev);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={mapContainerStyle}>
        <button style={enableGPS ? redButtonStyle : greenButtonStyle} onClick={handleToggleGPS}>
          {enableGPS ? 'Disable GPS' : 'Enable GPS'}
        </button>
        <button style={greenButtonStyle} onClick={calculateRooftopArea}>
          Calculate Rooftop Area
        </button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition}
          zoom={17}
          mapTypeId="satellite"
          onClick={handleMapClick}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {currentPosition && (
            <Marker position={currentPosition} onClick={handleMarkerClick} />
          )}
          {roofCoordinates.length > 0 && (
            <Polygon
              path={roofCoordinates}
              options={{
                fillColor: 'blue',
                fillOpacity: 0.5,
                strokeColor: 'blue',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
        {modalOpen && (
          <div style={{ ...modalStyle }}>
            <h2>Rooftop Area</h2>
            <p>The approximate area of the rooftop is {roofArea} square meters.</p>
            <button style={redButtonStyle} onClick={handleModalClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default GoogleMapWithMarker;
