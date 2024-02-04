import React from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, XAxis, YAxis, Pie, Cell, CartesianGrid, Tooltip, Legend } from 'recharts';
import energySavingsData from '../data/energySavingsData';

const EnergySavingsChart = () => {
  const chartContainerStyle = {
    display: 'flex',
  };

  const chartStyle = {
    flex: 1,
    backgroundColor: '#8cedab',
    borderRadius: '8px',
    margin: '0 10px',  // Add some margin between the charts
    padding: '100px',
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
    <div style={chartContainerStyle}>
      {/* Line Chart */}
      <div style={chartStyle}>
        <LineChart width={600} height={400} data={energySavingsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" style={axisStyle} />
          <YAxis style={axisStyle} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <Line type="monotone" dataKey="savings" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
  
      {/* Bar Chart */}
      <div style={chartStyle}>
        <BarChart width={600} height={400} data={energySavingsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" style={axisStyle} />
          <YAxis style={axisStyle} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <Bar dataKey="savings" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default EnergySavingsChart;
