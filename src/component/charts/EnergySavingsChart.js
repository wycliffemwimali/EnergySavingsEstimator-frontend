import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import energySavingsData from '../data/energySavingsData';

const EnergySavingsChart = () => {
  const chartStyle = {
    backgroundColor: '#8cedab',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const axisStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    fill: '#333',
  };

  const tooltipStyle = {
    fontSize: '14px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '8px',
  };

  return (
    <div style={chartStyle}>
      <LineChart width={800} height={400} data={energySavingsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" style={axisStyle} />
        <YAxis style={axisStyle} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        <Line type="monotone" dataKey="savings" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default EnergySavingsChart;
