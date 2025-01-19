/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */

import { Dispatch } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { useRouter } from 'next/navigation';

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
  tagTypes: ['cleanUp'],
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
      query(params) {
        return {
          url: `student/sessions`,
          params,
        };
      },
    }),
    getPastSessions: builder.query({
      query() {
        return {
          url: `student/past-sessions/`,
        };
      },
    }),

    bookSessionStudent: builder.mutation({
      query: ({ body, subject_id }: any) => {
        return {
          url: `student/book-session/${subject_id}/`,
          method: 'post',
          body,
        };
      },
    }),
    feedback: builder.mutation({
      query: ({ body, session_id }: any) => {
        return {
          url: `student/session-feedback/${session_id}/`,
          method: 'post',
          body,
        };
      },
    }),
    joinMeeting: builder.mutation({
      query: (meeting_id: any) => {
        return {
          url: `student/join-meeting/${meeting_id}/`,
          method: 'post',
          body: {},
        };
      },
    }),
    leaveMeeting: builder.mutation({
      query: (meeting_id) => {
        return {
          url: `student/leave-meeting/${meeting_id}/`,
          method: 'PATCH',
          body: {},
        };
      },
    }),

    getActiveCourses: builder.query({
      query: (params) => {
        return {
          url: `student/get-active-courses/`,
          params,
        };
      },
      //@ts-ignore
      invalidatesTags: ['cleanUp'],
    }),
    getCompletedCourses: builder.query({
      query: (params) => {
        return {
          url: `student/get-completed-courses/`,
          params,
        };
      },
      //@ts-ignore
      invalidatesTags: ['cleanUp'],
    }),
    getPastSession: builder.query({
      query: () => {
        return {
          url: `student/past-sessions/`,
        };
      },
    }),
    getCalendar: builder.query({
      query: () => {
        return {
          url: `student/calender/`,
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
  useJoinMeetingMutation,
  useLeaveMeetingMutation,
  useLazyGetActiveCoursesQuery,
  useLazyGetCompletedCoursesQuery,
  useLazyGetPastSessionsQuery,
  useLazyGetCalendarQuery,
} = studentService;
