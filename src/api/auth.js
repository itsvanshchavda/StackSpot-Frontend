import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (newUser) => ({
        url: `auth/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newUser,
      }),
    }),

    userlogout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    refetch:builder.query({
      query: () => ({
        url: `auth/refetch`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    register: builder.mutation({
      query: (newUser) => ({
        url: `auth/register`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUserlogoutMutation  , useRefetchQuery } =
  authApi;
