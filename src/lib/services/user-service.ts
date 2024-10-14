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
import { RootState } from '../store';

interface CustomErr {
  data: {
    error: string;
    message: any;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'https://backend.codemunsta.co/';

export const userService = createApi({
  reducerPath: 'userService',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;
      // console.log(token, getState());
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }) as any,
  tagTypes: ['cleanUp'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: `accounts/user/`,
        };
      },
      //@ts-ignore
      invalidatesTags: ['cleanUp'],
    }),
    getSubjects: builder.query({
      query: () => {
        return {
          url: `subjects/get_base_subjects/`,
        };
      },
      //@ts-ignore
      invalidatesTags: ['cleanUp'],
    }),
    getConnection: builder.query({
      query: (token) => {
        return {
          url: `accounts/user/get/connection/request?token=${token}`,
        };
      },
      //@ts-ignore
      invalidatesTags: ['cleanUp'],
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useGetSubjectsQuery,
  useLazyGetConnectionQuery,
} = userService;
