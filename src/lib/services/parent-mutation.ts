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

export const parentService = createApi({
  reducerPath: 'parentService',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as any).app.token;
      // console.log(token, getState());
      // headers.set('x-api-key', 'aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB');
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      // if (token) {
      //   headers.set('Authorization', `${token}`);
      // }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: (builder) => ({
    addWard: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/parent/manage/ward/',
          method: 'post',
          body,
        };
      },
    }),
    addSubjectForWard: builder.mutation({
      query: (body: any) => {
        return {
          url: `accounts/parent/add/interested-subjects/ward/${body.id}`,
          method: 'put',
          body: body.body,
        };
      },
    }),
    getAWard: builder.query({
      query: (id) => {
        return {
          url: `accounts/parent/manage/ward/${id}`,
        };
      },
    }),
    editWard: builder.mutation({
      query: (body: any) => {
        return {
          url: `accounts/parent/manage/ward/${body.id}`,
          method: 'put',
          body: body.body,
        };
      },
    }),
    connectWard: builder.mutation({
      query: (body: any) => {
        return {
          url: `accounts/parent/manage/ward/${body.id}`,
          method: 'patch',
          body,
        };
      },
    }),
    getWards: builder.query({
      query: () => {
        return {
          url: `accounts/parent/get/wards/`,
        };
      },
    }),
  }),
});

export const {
  useAddWardMutation,
  useAddSubjectForWardMutation,
  useConnectWardMutation,
  useEditWardMutation,
  useGetAWardQuery,
  useGetWardsQuery,
} = parentService;
