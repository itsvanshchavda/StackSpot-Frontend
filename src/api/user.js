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
      query: (user) => ({
        url: `/user/update`,
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

    getAllUsers: builder.query({
      query: (id) => `/alluser/${id}`,
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `/alluser/follow/${id}`,
        method: "PUT",
      }),
    }),

    userFollowingList: builder.query({
      query: (id) => `/alluser/following/${id}`,
    }),

    userFollowerList: builder.query({
      query: (id) => `/alluser/followers/${id}`,
    }),

    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `/alluser/unfollow/${id}`,
        method: "PUT",
      }),
    }),


    getAllUsersList:builder.query({
      query:()=> `/user/allUser`,
      
    }),

    searchUser: builder.query({
      query: (search) => `/user/search/${search}`,
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useAddProfilePhotoMutation,
  useGetAllUsersQuery,
  useFollowUserMutation,
  useUserFollowingListQuery,
  useUserFollowerListQuery,
  useUnfollowUserMutation,
  useGetAllUsersListQuery,
  useSearchUserQuery,
} = userApi;
