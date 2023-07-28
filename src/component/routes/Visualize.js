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
`;

const ChartContainer = styled.div`
  flex-basis: calc(33% - 20px); /* Adjust the width of each chart container */
  margin-bottom: 20px;
`;

const Visualize = () => {
  return (
    <AppWrapper>
      <h1>Energy Savings Visualization</h1>
      <ChartContainer>
        <h2>Energy Savings</h2>
        <EnergySavingsChart data={energySavingsData} dataKey="energySavings" color="#8884d8" />
      </ChartContainer>
      <ChartContainer>
        <h2>Cooling Efficiency</h2>
        <EnergySavingsChart data={energySavingsData} dataKey="coolingEfficiency" color="#82ca9d" />
      </ChartContainer>
      <ChartContainer>
        <h2>Cooling Load Reduction</h2>
        <EnergySavingsChart data={energySavingsData} dataKey="coolingLoadReduction" color="#ffc658" />
      </ChartContainer>
    </AppWrapper>
  );
};

export default Visualize;
