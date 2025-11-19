import React from 'react';
import './analytic.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#f39c12', '#3498db', '#2ecc71'];

const Analytics = ({ data = {} }) => {
  return (
    <div className="analytics-container">
      <div className="chart-section">
        <div className="chart-box full">
          <h3>Patients Served Per Day</h3>
          <LineChart width={600} height={300} data={data.patientTrend || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="served" stroke="#3498db" />
          </LineChart>
        </div>

        <div className="chart-box">
          <h3>Patients per Doctor</h3>
          <BarChart width={300} height={250} data={data.doctorLoad || []}>
            <XAxis dataKey="doctor" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="patients" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart-box">
          <h3>Status Breakdown</h3>
          <PieChart width={300} height={250}>
            <Pie 
              data={data.statusSplit || []} 
              dataKey="value" 
              outerRadius={80} 
              label
            >
              {(data.statusSplit || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;