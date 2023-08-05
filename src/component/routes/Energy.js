import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Energy() {
  const [predictedSavings, setPredictedSavings] = useState(0);
  const [latestRooftopId, setLatestRooftopId] = useState(null);
  const [rooftopDetails, setrooftopDetails] = useState('');

  useEffect(() => {
    fetchLatestRooftopId();
  }, []);

  useEffect(() => {
    if (latestRooftopId !== null) {
      fetchEnergySavings(latestRooftopId);
      fetchrooftopDetails(latestRooftopId);
    }
  }, [latestRooftopId]);

  const fetchLatestRooftopId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rooftop/latest-rooftop');
      setLatestRooftopId(response.data);
    } catch (error) {
      console.error('Error fetching latest rooftop ID:', error);
    }
  };

  const fetchEnergySavings = async (rooftopId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/energy-savings/${rooftopId}`);
      setPredictedSavings(response.data);
    } catch (error) {
      console.error('Error fetching energy savings:', error);
    }
  };

  const fetchrooftopDetails = async (rooftopId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooftop/${rooftopId}`);
      setrooftopDetails(response.data);
    } catch (error) {
      console.error('Error fetching rooftop details:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Energy Savings Calculator</h1>
      {latestRooftopId === null || rooftopDetails === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Rooftop Area: {rooftopDetails.area} Square Meters</p>
          <p>Rooftop Material: {rooftopDetails.material}</p>
          {predictedSavings > 0 ? (
            <p style={{ fontSize: '18px', marginTop: '20px' }}>
              Predicted Savings: {predictedSavings.toFixed(2)} kWh
            </p>
          ) : (
            <p>No energy savings data available for the latest rooftop.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Energy;
