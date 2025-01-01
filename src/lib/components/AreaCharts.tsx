import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const AreaChartsComponent = ({ ratingsData }: { ratingsData: any }) => {
  return (
    <ResponsiveContainer width={'100%'} height="100%">
      <AreaChart
        data={[
          {
            rating: '1',
            count: ratingsData?.ratings_count?.one_star || 0,
          },
          {
            rating: '2',
            count: ratingsData?.ratings_count?.two_stars || 0,
          },
          {
            rating: '3',
            count: ratingsData?.ratings_count?.three_stars || 0,
          },
          {
            rating: '4',
            count: ratingsData?.ratings_count?.four_stars || 0,
          },
          {
            rating: '5',
            count: ratingsData?.ratings_count?.five_stars || 0,
          },
        ]}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="rating" hide />
        <YAxis dataKey="count" hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#FD8E1F"
          fillOpacity={1}
          strokeWidth={3}
          fill="#FFF2E5"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartsComponent;
