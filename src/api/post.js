import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => `/post/`,
    }),

    getSearchPost: builder.mutation({
      query: (search) => ({
        url: `/post/search/${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getPostById: builder.query({
      query: (postId) => `/post/${postId}`,
    }),

    uploadFile: builder.mutation({
      query: (file) => ({
        url: `/post/upload`,
        method: "POST",
        body: file,
      }),
    }),

    postUpload: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updatePost: builder.mutation({
      query: ({ updateData, postId }) => ({
        url: `/post/${postId}`, 
        method: "PUT",
        body: updateData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getUserPost: builder.query({
      query: (userId) => `/post/user/${userId}`,
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetSearchPostMutation,
  useGetPostByIdQuery,
  useUploadFileMutation,
  usePostUploadMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetUserPostQuery,
} = postApi;
