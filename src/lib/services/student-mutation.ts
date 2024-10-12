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
          url: `student/dashboard/`,
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

    getAuthUser: builder.query({
      query() {
        return {
          url: 'accounts/user/authenticated/user/',
        };
      },
    }),
    getStudentCalender: builder.query({
      query() {
        return {
          url: 'student/calender/',
        };
      },
    }),
    getTutorCalender: builder.query({
      query({ id, params }) {
        return {
          url: `student/get-instructor-calender/${id}`,
          params,
        };
      },
    }),
    getCurrentSubscription: builder.query({
      query() {
        return {
          url: `student/get/current/subscription/`,
        };
      },
    }),
    getStudentSession: builder.query({
      query() {
        return {
          url: `student/sessions/`,
        };
      },
    }),
    bookSessionStudent: builder.mutation({
      query: ({ body, subject_id, instructor_id }: any) => {
        return {
          url: `student/book-session/${instructor_id}/${subject_id}/`,
          method: 'post',
          body,
        };
      },
    }),
    feedback: builder.mutation({
      query: ({ body, session_id }: any) => {
        return {
          url: `/student/session-feedback/${session_id}/`,
          method: 'post',
          body,
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
  useLazyGetCurrentSubscriptionQuery,
  useLazyGetStudentCalenderQuery,
  useLazyGetStudentSessionQuery,
  useLazyGetTutorCalenderQuery,
  useBookSessionStudentMutation,
  useFeedbackMutation,
} = studentService;
