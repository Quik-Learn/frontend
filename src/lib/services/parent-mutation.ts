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

export const baseUrl = 'https://backend.codemunsta.co/';

export const parentService = createApi({
  reducerPath: 'parentService',
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
          url: `accounts/parent/add/interested-subjects/ward/${body.id}/`,
          method: 'PUT',
          body: body.body,
        };
      },
    }),
    getParentDashboard: builder.query({
      query: (id) => {
        return {
          url: `accounts/parent/dashboard/`,
        };
      },
    }),

    // updateUserProfile: builder.mutation({
    //   query: (body: any) => {
    //     return {
    //       url: ``,
    //       method: 'PUT',
    //       body,
    //       formData: true,
    //     };
    //   },
    // }),
    updateUserProfile: builder.mutation<any, any>({
      query: (body: any) => {
        return {
          url: '/accounts/user/',
          method: 'PUT',
          body,
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
          method: 'PUT',
          body: body.body,
        };
      },
    }),
    connectWard: builder.mutation({
      query: (body: any) => {
        return {
          url: `accounts/parent/manage/ward/`,
          method: 'PATCH',
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
    getAllWards: builder.query({
      query: () => {
        return {
          url: `finance/subscription/ward-page/`,
        };
      },
    }),
    getSubjects: builder.query({
      query: (params) => {
        return {
          url: `subjects/`,
          params,
        };
      },
      //@ts-ignore
      invalidatesTags: ['cleanUp'],
    }),
    searchWard: builder.query({
      query: (params) => {
        return {
          url: `accounts/parent/search/ward/`,
          params,
        };
      },
    }),

    setTypeFromSocial: builder.mutation({
      query: (body: any) => {
        return {
          url: 'accounts/user/set/account/type/from/social/',
          method: 'PATCH',
          body,
        };
      },
    }),
    getStudentCalender: builder.query({
      query: (id) => {
        return {
          url: `/parent/get-ward-calender/${id}`,
        };
      },
    }),
    subscribe: builder.mutation({
      query: (body: any) => {
        return {
          url: `finance/subscription/subscribe/${body?.ward_id}/${body?.plan_id}/`,
          method: 'post',
          body: {},
        };
      },
    }),
    getAllPlans: builder.query({
      query: () => {
        return {
          url: `finance/plans/all/`,
        };
      },
    }),
    verifyPayment: builder.mutation({
      query: (transaction_id: string) => {
        return {
          url: `finance/subscription/verify/${transaction_id}/`,
          method: 'PUT',
          body: {},
        };
      },
    }),

    getAPayment: builder.query({
      query: (ward_id) => {
        return {
          url: `finance/subscription/ward/subscription/page/${ward_id}/`,
        };
      },
    }),
    getACourse: builder.query({
      query: (subject_id) => {
        return {
          url: `subjects/${subject_id}/`,
        };
      },
    }),
    getCourseTutor: builder.query({
      query: (subject_id) => {
        return {
          url: `instructor/get/subject/${subject_id}/`,
        };
      },
    }),
    getResources: builder.query({
      query: () => {
        return {
          url: `multimedia/materials/all/open/`,
        };
      },
    }),

    getTutor: builder.query({
      query: (instructor_id) => {
        return {
          url: `/instructor/get/${instructor_id}/`,
        };
      },
    }),
    getTutorOverview: builder.query({
      query: (instructor_id) => {
        return {
          url: `/instructor/overview/${instructor_id}/`,
        };
      },
    }),
    getTutorRating: builder.query({
      query: (instructor_id) => {
        return {
          url: `/instructor/reviews/${instructor_id}/`,
        };
      },
    }),
    bookSessionParent: builder.mutation({
      query: ({ body, subject_id, ward_id }: any) => {
        return {
          url: `parent/book-session/${subject_id}/${ward_id}/`,
          method: 'POST',
          body,
        };
      },
    }),
    getTutorCalender: builder.query({
      query: ({ id, params }) => {
        return {
          url: `parent/get-instructor-calender/${id}`,
          params,
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
  useSetTypeFromSocialMutation,
  useUpdateUserProfileMutation,
  useLazyGetParentDashboardQuery,
  useGetSubjectsQuery,
  useLazyGetSubjectsQuery,
  useLazySearchWardQuery,
  useGetAllWardsQuery,
  useSubscribeMutation,
  useGetAllPlansQuery,
  useVerifyPaymentMutation,
  useLazyGetAPaymentQuery,
  useLazyGetACourseQuery,
  useLazyGetCourseTutorQuery,
  useLazyGetResourcesQuery,
  useLazyGetTutorOverviewQuery,
  useLazyGetTutorQuery,
  useLazyGetTutorRatingQuery,
  useBookSessionParentMutation,
  useLazyGetTutorCalenderQuery,
  useLazyGetStudentCalenderQuery,
} = parentService;
