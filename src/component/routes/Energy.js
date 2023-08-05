import React, { useState } from 'react';

function Energy() {
  const [currentEnergyConsumption, setCurrentEnergyConsumption] = useState(0);
  const [energySavingPercentage, setEnergySavingPercentage] = useState(0);
  const [predictedAnnualSavings, setPredictedAnnualSavings] = useState(0);

  const handleCurrentEnergyChange = (event) => {
    setCurrentEnergyConsumption(Number(event.target.value));
  };

  const handleEnergySavingPercentageChange = (event) => {
    setEnergySavingPercentage(Number(event.target.value));
  };

  const calculatePredictedAnnualSavings = () => {
    const annualSavings = (currentEnergyConsumption * energySavingPercentage) / 100;
    setPredictedAnnualSavings(annualSavings);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Energy Savings Calculator</h1>
      <div>
        <label>
          Current Energy Consumption (kWh/year):
          <input
            type="number"
            value={currentEnergyConsumption}
            onChange={handleCurrentEnergyChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div>
        <label>
          Energy Saving Percentage (%):
          <input
            type="number"
            value={energySavingPercentage}
            onChange={handleEnergySavingPercentageChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div>
        <button onClick={calculatePredictedAnnualSavings} style={{ marginTop: '10px' }}>
          Calculate Predicted Annual Savings
        </button>
      </div>
      <div>
        {predictedAnnualSavings > 0 && (
          <p style={{ fontSize: '18px', marginTop: '20px' }}>
            Predicted Annual Savings: {predictedAnnualSavings.toFixed(2)} kWh
          </p>
        )}
      </div>
    </div>
  );
}

export default Energy;
