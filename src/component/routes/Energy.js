import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Energy.css'; // Import a separate CSS file for styling

function Energy() {
  const [predictedSavings, setPredictedSavings] = useState(0);
  const [latestRooftopId, setLatestRooftopId] = useState(null);
  const [rooftopDetails, setRooftopDetails] = useState('');

  useEffect(() => {
    fetchLatestRooftopId();
  }, []);

  useEffect(() => {
    if (latestRooftopId !== null) {
      fetchEnergySavings(latestRooftopId);
      fetchRooftopDetails(latestRooftopId);
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

  const fetchRooftopDetails = async (rooftopId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooftop/${rooftopId}`);
      setRooftopDetails(response.data);
    } catch (error) {
      console.error('Error fetching rooftop details:', error);
    }
  };

  // Calculate monthly and annual energy savings in kWh
  const monthlySavings = predictedSavings;
  const annualSavings = predictedSavings * 12;

  // Assuming the cost of electricity per kWh is $0.12 (you can change this value as needed)
  const electricityCostPerKWh = 0.12;
  const monthlyCostSavings = monthlySavings * electricityCostPerKWh;
  const annualCostSavings = annualSavings * electricityCostPerKWh;

  return (
    <div className="energy-container">
      <h1 className="energy-title">Energy Savings Calculator</h1>
      {latestRooftopId === null || rooftopDetails === '' ? (
        <p className="energy-loading">Loading...</p>
      ) : (
        <div className="energy-details">
          <p className="energy-text">Rooftop Area: {rooftopDetails.area} Square Meters</p>
          <p className="energy-text">Rooftop Material: {rooftopDetails.material}</p>
          {predictedSavings > 0 ? (
            <div>
              <p className="energy-savings-positive">
                Predicted Savings: {monthlySavings.toFixed(2)} kWh
              </p>
              <p className="energy-savings-positive">
                Annual Savings: {annualSavings.toFixed(2)} kWh
              </p>
              <p className="energy-savings-positive">
                Monthly Cost Savings: ${monthlyCostSavings.toFixed(2)}
              </p>
              <p className="energy-savings-positive">
                Annual Cost Savings: ${annualCostSavings.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="energy-savings-negative">
              No energy savings data available for the latest rooftop.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Energy;
