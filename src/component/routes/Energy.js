import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Energy.css"; // Import a separate CSS file for styling

function Energy() {
  const [predictedSavings, setPredictedSavings] = useState(0);
  const [latestRooftopId, setLatestRooftopId] = useState(null);
  const [rooftopDetails, setRooftopDetails] = useState("");
  const [exchangeRate, setExchangeRate] = useState(110); // Replace with the current exchange rate

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
      const response = await axios.get(
        "http://localhost:8080/api/rooftop/latest-rooftop"
      );
      setLatestRooftopId(response.data);
    } catch (error) {
      console.error("Error fetching latest rooftop ID:", error);
    }
  };

  const fetchEnergySavings = async (rooftopId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/energy-savings/${rooftopId}`
      );
      setPredictedSavings(response.data);
    } catch (error) {
      console.error("Error fetching energy savings:", error);
    }
  };

  const fetchRooftopDetails = async (rooftopId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/rooftop/${rooftopId}`
      );
      setRooftopDetails(response.data);
    } catch (error) {
      console.error("Error fetching rooftop details:", error);
    }
  };

  // Calculate monthly and annual energy savings in kWh
  const monthlySavings = predictedSavings;
  const annualSavings = predictedSavings * 12;

  // Assuming the cost of electricity per kWh is $0.172 (you can change this value as needed)
  const electricityCostPerKWh = 0.172;
  const monthlyCostSavings = monthlySavings * electricityCostPerKWh;
  const annualCostSavings = annualSavings * electricityCostPerKWh;

  // Calculate the cost savings in Kenyan Shillings
  const monthlyCostSavingsInKES = monthlyCostSavings * exchangeRate;
  const annualCostSavingsInKES = annualCostSavings * exchangeRate;

  // Calculate the percentage of monthly savings for the circular graph
  const monthlyPercentage = (monthlySavings / annualSavings) * 100;

  const insightsContainerStyle = {
    margin: "20px 0",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const insightsHeaderStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#000", // Set text color to black
  };

  const insightsListStyle = {
    listStyleType: "disc",
    marginLeft: "20px",
  };

  const insightItemStyle = {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#000", // Set text color to black
  };

  useEffect(() => {
    if (predictedSavings > 0) {
      drawCircularGraph(monthlyPercentage);
    }
  }, [monthlyPercentage]);

  const generateInsights = () => {
    const insights = [];

    if (predictedSavings > 0) {
      if (annualCostSavings > 1000) {
        insights.push(
          "Consider using reflective roofing materials for higher energy savings."
        );
      }
      if (annualCostSavings > 200) {
        insights.push(
          "Roofs with better insulation can lead to significant cost savings."
        );
      }
      if (rooftopDetails.material === "Metal") {
        insights.push(
          "Consider using reflective roofing materials for higher energy savings."
        );
        insights.push(
          "Metal roofs are known for their durability and Longetivity."
        );
      }
      if (rooftopDetails.material === "Tile") {
        insights.push(
          "Tile roofs provide good insulation and help regulate temperature."
        );
      }
      if (rooftopDetails.material === "Concrete") {
        insights.push(
          "Concrete roofs provide good insulation and help regulate temperature."
        );
      }
      // You can add more conditions based on different types of roofing materials and their benefits
    }

    return insights;
  };

  const insights = generateInsights();

  const drawCircularGraph = (percentage) => {
    const canvas = document.getElementById("energy-chart");
    const ctx = canvas.getContext("2d");
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 80;
    const startAngle = -0.5 * Math.PI;
    const endAngle = (percentage / 100) * 2 * Math.PI;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();

    // Draw the filled arc
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 30;
    ctx.strokeStyle = "#42b883";
    ctx.stroke();

    // Add the label text
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${percentage.toFixed(2)}%`, x, y);
    ctx.fillText("Monthly Savings", x, y + 40);
  };

  return (
    <>
      <div className="energy-container">
        <h1 className="energy-title">Energy Savings Calculator</h1>
        {latestRooftopId === null || rooftopDetails === "" ? (
          <p className="energy-loading">Loading...</p>
        ) : (
          <div className="energy-content">
            <div className="energy-details">
              <p className="energy-text">
                Rooftop Area: {rooftopDetails.area} Square Meters
              </p>
              <p className="energy-text">
                Rooftop Material: {rooftopDetails.material}
              </p>
              {predictedSavings > 0 ? (
                <div>
                  <p className="energy-savings-positive">
                    Predicted Savings: {predictedSavings.toFixed(2)} kWh
                  </p>
                  {/* <p className="energy-savings-positive">
                    Monthly Savings: {monthlySavings.toFixed(2)} kWh
                  </p> */}
                  <p className="energy-savings-positive">
                    Annual Savings: {annualSavings.toFixed(2)} kWh
                  </p>
                  <p className="energy-savings-positive">
                    Monthly Cost Savings: ${monthlyCostSavings.toFixed(2)}
                  </p>
                  <p className="energy-savings-positive">
                    Annual Cost Savings: ${annualCostSavings.toFixed(2)}
                  </p>
                  {/* <p className="energy-savings-positive">
                    Monthly Savings in KES:  {monthlyCostSavingsInKES.toFixed(2)}
                  </p>
                  <p className="energy-savings-positive">
                    Annual Savings in KES:  {annualCostSavingsInKES.toFixed(2)}
                  </p> */}
                </div>
              ) : (
                <p className="energy-savings-negative">
                  No energy savings data available for the latest rooftop.
                </p>
              )}
              <div className="energy-insights" style={insightsContainerStyle}>
                <h2 style={insightsHeaderStyle}>Recommendation</h2>
                <ul style={insightsListStyle}>
                  {insights.map((insight, index) => (
                    <li key={index} style={insightItemStyle}>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Render the Circular Graph */}
      <div className="energy-chart-container">
        <canvas id="energy-chart" width="200" height="200"></canvas>
      </div>
    </>
  );
}

export default Energy;
