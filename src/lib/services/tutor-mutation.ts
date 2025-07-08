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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const tutorService = createApi({
  reducerPath: 'tutorService',
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
    getRatings: builder.query({
      query: () => {
        return {
          url: `tutor/dashboard/ratings/`,
        };
      },
    }),
    getActivities: builder.query({
      query: (id) => {
        return {
          url: `tutor/dashboard/activities/`,
        };
      },
    }),
    getTutorDashboard: builder.query({
      query: (id) => {
        return {
          url: `tutor/dashboard/`,
        };
      },
    }),
    getCourses: builder.query({
      query: (id) => {
        return {
          url: `tutor/get/all/courses/`,
        };
      },
    }),
    getSubjects: builder.query({
      query: (params) => {
        return {
          url: `tutor/get/all/subjects/`,
          params,
        };
      },
    }),
    getSessions: builder.query({
      query: (id) => {
        return {
          url: `tutor/my-sessions/`,
        };
      },
    }),
    getSingleCourse: builder.query({
      query: (id) => {
        return {
          url: `tutor/course/${id}/`,
        };
      },
    }),
    getCourseTopics: builder.query({
      query: (id) => {
        return {
          url: `tutor/get/topics/${id}/`,
        };
      },
    }),

    getStudentSessions: builder.query({
      query: (id) => {
        return {
          url: `tutor/get/student-sessions/${id}/`,
        };
      },
    }),

    getResources: builder.query({
      query: (id) => {
        return {
          url: `tutor/get/resources/${id}/`,
        };
      },
    }),
    getStudents: builder.query({
      query: () => {
        return {
          url: `tutor/get/all/students`,
        };
      },
    }),
    createTopic: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `tutor/create/topic/${id}/`,
          method: 'POST',
          body,
        };
      },
    }),
    createSession: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `tutor/create/session/${id}/`,
          method: 'POST',
          body,
        };
      },
    }),
    editSession: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `tutor/edit/session/${id}/`,
          method: 'PUT',
          body,
        };
      },
    }),
    createResource: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `tutor/upload/resources/${id}/`,
          method: 'POST',
          body,
        };
      },
    }),
    joinMeetingTutor: builder.mutation({
      query: (meeting_id: any) => {
        return {
          url: `tutor/join-meeting/${meeting_id}/`,
          method: 'post',
          body: {},
        };
      },
    }),
    leaveMeetingTutor: builder.mutation({
      query: (meeting_id: any) => {
        return {
          url: `tutor/leave-meeting/${meeting_id}/`,
          method: 'PATCH',
          body: {},
        };
      },
    }),
    deleteSession: builder.mutation({
      query: (id) => {
        return {
          url: `tutor/delete/session/${id}/`,
          method: 'DELETE',
        };
      },
    }),
    getSessionById: builder.query({
      query: (id) => {
        return {
          url: `/tutor/get-home-session/${id}/`,
        };
      },
    }),
    checkIn: builder.mutation({
      query: (id) => {
        return {
          url: `/tutor/checkin_home_session/${id}/`,
          method: 'PUT',
          body: {},
        };
      },
    }),
    checkOut: builder.mutation({
      query: (id) => {
        return {
          url: `/tutor/checkout_home_session/${id}/`,
          method: 'PUT',
          body: {},
        };
      },
    }),
    markAttendance: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/tutor/mark_student_attendance/${id}/`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const {
  useLazyGetRatingsQuery,
  useLazyGetActivitiesQuery,
  useLazyGetTutorDashboardQuery,
  useLazyGetCoursesQuery,
  useGetSubjectsQuery,
  useLazyGetSubjectsQuery,
  useLazyGetSessionsQuery,
  useLazyGetSingleCourseQuery,
  useLazyGetStudentsQuery,
  useLazyGetCourseTopicsQuery,
  useCreateTopicMutation,
  useLazyGetStudentSessionsQuery,
  useCreateSessionMutation,
  useEditSessionMutation,
  useLazyGetResourcesQuery,
  useCreateResourceMutation,
  useJoinMeetingTutorMutation,
  useLeaveMeetingTutorMutation,
  useDeleteSessionMutation,
  useLazyGetSessionByIdQuery,
  useCheckInMutation,
  useCheckOutMutation,
  useMarkAttendanceMutation,
} = tutorService;
