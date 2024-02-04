// src/Visualize.js
import React from 'react';
import styled from 'styled-components';
import EnergySavingsChart from '../charts/EnergySavingsChartV';
import energySavingsData from '../data/visualization/energySavingsDataV';

const AppWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #8cedab;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex; /* Use Flexbox to arrange charts horizontally */
  flex-wrap: wrap; /* Allow charts to wrap to the next line if needed */
  justify-content: space-between; /* Distribute charts evenly along the container */
  height: 850px
`;

const ChartContainer = styled.div`
  flex: 1;
  background-color: #8cedab;
  border-radius: 8px;
  margin: 0 10px;
  padding: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  height: 800px; /* Adjust the height as needed */
`;


const Visualize = () => {
  return (
    <AppWrapper>
      {/* <h1>Energy Savings Visualization</h1> */}
      {/* Energy Savings Chart
      <ChartContainer>
        <EnergySavingsChart data={energySavingsData} dataKey="energySavings" color="#8C99F3" />
      </ChartContainer> */}

      {/* Cooling Efficiency Chart */}
      <ChartContainer>
        <EnergySavingsChart data={energySavingsData} dataKey="coolingEfficiency" color="#620E86" />
      </ChartContainer>

      {/* Cooling Load Reduction Chart */}
      <ChartContainer>
        <EnergySavingsChart data={energySavingsData} dataKey="coolingLoadReduction" color="#1633F0" />
      </ChartContainer>
    </AppWrapper>
  );
};

export default Visualize;
