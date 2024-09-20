import React from 'react';
import { Pie, ResponsiveContainer, PieChart, Cell } from 'recharts';
import { data01 } from '../utils/data';

const PieChartComponent = () => {
  const COLORS = ['#0065FF', '#DDDDDD'];
  return (
    <ResponsiveContainer width={'100%'} height="100%">
      <PieChart>
        <Pie
          data={data01}
          cx={'50%'}
          cy={'50%'}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
