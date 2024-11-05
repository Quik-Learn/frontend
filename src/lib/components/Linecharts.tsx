'use client';

import React, { useMemo } from 'react';
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
const colors = [
  '#FFC727',
  '#0065FF',
  '#FF8042',
  '#A569BD',
  '#0065FF',
  '#00C49F',
];
const Linecharts = ({ weeklyStats }: any) => {
  const { chartData, userNames } = useMemo(() => {
    const users = weeklyStats?.map((stat: { user: any }) => stat.user);

    // Transform data: Create array for each day with user hours
    const transformedData: any = [
      { day: 'Sunday' },
      { day: 'Monday' },
      { day: 'Tuesday' },
      { day: 'Wednesday' },
      { day: 'Thursday' },
      { day: 'Friday' },
      { day: 'Saturday' },
    ];

    // Populate each day with the user's hours
    weeklyStats.forEach(
      (stat: {
        user: string | number;
        sunday_hours: any;
        monday_hours: any;
        tuesday_hours: any;
        wednesday_hours: any;
        thursday_hours: any;
        friday_hours: any;
        saturday_hours: any;
      }) => {
        transformedData[0][stat.user] = stat.sunday_hours;
        transformedData[1][stat.user] = stat.monday_hours;
        transformedData[2][stat.user] = stat.tuesday_hours;
        transformedData[3][stat.user] = stat.wednesday_hours;
        transformedData[4][stat.user] = stat.thursday_hours;
        transformedData[5][stat.user] = stat.friday_hours;
        transformedData[6][stat.user] = stat.saturday_hours;
      }
    );

    return { chartData: transformedData, userNames: users };
  }, [weeklyStats]);
  return (
    <ResponsiveContainer width={'100%'} height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend align="right" verticalAlign="top" />
        {userNames?.map((user: any, index: number) => (
          <Bar
            key={user}
            dataKey={user}
            stackId="a"
            barSize={30}
            fill={colors[index % colors.length]} // Cycle through colors
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Linecharts;
