/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface CustomErr {
  data: {
    error: string;
    message: any;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'https://backend.codemunsta.co/';

export const studentService = createApi({
  reducerPath: 'studentService',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).app.token;
      // console.log(token, getState());
      // headers.set('x-api-key', 'aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB');
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: (builder) => ({
    onboardStudent: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/student/onboarding/',
          method: 'post',
          body,
        };
      },
    }),
    getStudentDashboard: builder.query({
      query: (id) => {
        return {
          url: `student/get/general_stats/`,
        };
      },
    }),
    receieveConnection: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/process/connection/request/',
          method: 'PATCH',
          body,
        };
      },
    }),
    getConnection: builder.query({
      query: () => {
        return {
          url: 'accounts/user/get/connection/request/',
        };
      },
    }),

    getAuthUser: builder.query({
      query() {
        return {
          url: 'accounts/user/authenticated/user/',
        };
      },
    }),
  }),
});

export const {
  useOnboardStudentMutation,
  useLazyGetStudentDashboardQuery,
  useReceieveConnectionMutation,
  useLazyGetAuthUserQuery,
  useLazyGetConnectionQuery,
} = studentService;
