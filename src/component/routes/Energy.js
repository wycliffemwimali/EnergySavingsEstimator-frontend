import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Energy() {
  const [predictedSavings, setPredicatedSavings] = useState(0);
  const [latestRooftopId, setLatestRooftopId] = useState(null);

  // useEffect(() => {
  //   fetchLatestRooftopId();
  // }, []);

  useEffect(() => {
    // if (latestRooftopId !== null) {
    //   fetchEnergySavings(latestRooftopId);
    // }
    fetchLatestRooftopId()
    fetchEnergySavings()
  }, [latestRooftopId]);

  const fetchLatestRooftopId = async () => {
    try {
        await axios.get('http://localhost:8080/api/rooftop/latest-rooftop')
        .then((res)=>{
        // console.log("id",res.data)
        setLatestRooftopId(res.data);

      })
      // const data = await response.json();
    } catch (error) {
      console.error('Error fetching latest rooftop ID:', error);
    }
  };

  const fetchEnergySavings = async () => {
    try {
      await axios.get(`http://localhost:8080/api/energy-savings/${latestRooftopId}`)
      .then((res)=>{
          // console.log(res.data)
        setPredicatedSavings(res.data);

      })
    } catch (error) {
      console.error('Error fetching energy savings:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Energy Savings Calculator</h1>
      {latestRooftopId === null ? (
        <p>Loading...</p>
      ) : (
        <>
          {predictedSavings > 0 ? (
            <p style={{ fontSize: '18px', marginTop: '20px' }}>
              Predicted Annual Savings: {predictedSavings.toFixed(2)} kWh
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
