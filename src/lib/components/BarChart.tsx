import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
const data = [
  {
    name: 'Page A',
    uv: 0,
  },
  {
    name: 'Page B',
    uv: 0,
  },
  {
    name: 'Page C',
    uv: 0,
  },
  {
    name: 'Page D',
    uv: 0,
  },
  {
    name: 'Page E',
    uv: 0,
  },
  {
    name: 'Page F',
    uv: 0,
  },
  {
    name: 'Page G',
    uv: 0,
  },
];
const BarChartsComponent = () => {
  return (
    <ResponsiveContainer width={'100%'} height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" hide />
        <YAxis hide />

        <Tooltip />
        <Bar
          type="monotone"
          dataKey="uv"
          fillOpacity={1}
          barSize={18}
          fill="#23BD33"
          background={{ fill: '#E1F7E3' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartsComponent;
