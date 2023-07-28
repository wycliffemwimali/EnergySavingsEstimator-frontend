import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import axios from 'axios';

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

const inputStyle = {
  padding: '8px',
  margin: '5px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const GoogleMapWithMarker = ({ apiKey }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [enableGPS, setEnableGPS] = useState(true);
  const [roofCoordinates, setRoofCoordinates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [roofArea, setRoofArea] = useState(null);
  const [material, setMaterial] = useState('');
  const [reflectance, setReflectance] = useState('');

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
  };

  const handleSubmit = () => {
    // Validate the material and reflectance values before sending them to the backend
    if (!material || !reflectance) {
      console.error('Material and reflectance values are required.');
      return;
    }

    // Prepare the payload to send to the backend with the correct property order
    const payload = {
      material,
      area: parseFloat(roofArea), // Convert to a floating-point number
      reflectance: parseFloat(reflectance), // Convert to a floating-point number
    };

    // Send the rooftop area, material, and reflectance to the backend
    axios
      .post('/api/rooftop/area', payload)
      .then((response) => {
        console.log('Rooftop data sent to the backend successfully.');
        // If you need to handle the backend response, you can do so here.
      })
      .catch((error) => {
        console.error('Error sending rooftop data to the backend:', error);
        // If there was an error sending the data, you can handle it here.
      });

    setModalOpen(false); // Close the modal after submission
    setRoofCoordinates([]); // Clear the selected building after finding the area
    setMaterial('');
    setReflectance('');
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
            <label htmlFor="material">Material:</label>
            <input
              type="text"
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              style={inputStyle}
            />
            <br />
            <label htmlFor="reflectance">Reflectance:</label>
            <input
              type="text"
              id="reflectance"
              value={reflectance}
              onChange={(e) => setReflectance(e.target.value)}
              style={inputStyle}
            />
            <br />
            <button style={greenButtonStyle} onClick={handleSubmit}>
              Submit
            </button>
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
