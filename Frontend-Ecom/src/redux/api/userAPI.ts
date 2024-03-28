import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../store';
import { MessageResponse } from '../../types/api-types';
import { User } from '../../types/types';

export const userAPI = createApi({
  reducerPath: 'userApi', // name
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/user/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: 'newuser',
        method: 'POST',
        body: user,
      }),
    }),
  }),

});

export const { useLoginMutation } = userAPI;
