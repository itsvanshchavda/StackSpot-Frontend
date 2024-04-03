import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/user/${userId}`,
    }),

    updateUser: builder.mutation({
      query: ({ userid, user }) => ({
        url: `/user/${userid}`,
        method: "PATCH",
        body: user,
      }),
    }),

    addProfilePhoto: builder.mutation({
      query: (photo) => ({
        url: `/user/upload`,
        method: "POST",
        body: photo,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation ,  useAddProfilePhotoMutation } = userApi;
