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

export const authService = createApi({
  reducerPath: 'authService',
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
    registerAccount: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/register/',
          method: 'post',
          body,
        };
      },
    }),

    loginAccount: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/login/',
          method: 'post',
          body,
        };
      },
    }),
    verifyOTP: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/verify-otp/',
          method: 'post',
          body,
        };
      },
      extraOptions: {
        
      },
    }),

    forgotPassword: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/forgot-password/',
          method: 'post',
          body,
        };
      },
    }),
    verifyPassword: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/verify-forgot-password/',
          method: 'post',
          body,
        };
      },
    }),

    setTypeFromSocial: builder.mutation({
      query: () => {
        return {
          url: 'accounts/user/set/account/type/from/social/',
          method: 'post',
          body: {},
        };
      },
    }),
  }),
});

export const {
  useRegisterAccountMutation,
  useLoginAccountMutation,

  useVerifyOTPMutation,
  useVerifyPasswordMutation,
  useForgotPasswordMutation,
  useSetTypeFromSocialMutation,
} = authService;
