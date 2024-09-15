'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { data, lineData } from '../utils/nav';

const Linecharts = () => {
  return (
    <ResponsiveContainer width={'100%'} height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend align="right" verticalAlign="top" />
        <Bar dataKey="Jacob" stackId="a" widths={30} fill="#FFC727" />
        <Bar dataKey="Sarah" stackId="a" width={30} fill="#0065FF" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Linecharts;
