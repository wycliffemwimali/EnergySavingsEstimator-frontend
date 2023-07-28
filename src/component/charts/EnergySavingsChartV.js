// src/EnergySavingsChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EnergySavingsChart = ({ data, dataKey, color }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default EnergySavingsChart;
