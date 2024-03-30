import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AllProductsResponse,
  MessageResponse,
  NewProductResponse,
  SearchQuery,
  SearchQueryRequest,
  categoriesResponse,
  searchProductsResponse,
} from '../../types/api-types';

export const productAPI = createApi({
  reducerPath: 'productApi', // name
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: {"latestProduct", "allProducts"}
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => 'latest',
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
    categories: builder.query<categoriesResponse, string>({
      query: () => `categories`,
    }),
    searchProducts: builder.query<searchProductsResponse, SearchQueryRequest>({
      query: ({ price, search, category, page, sort }) => {
        let base = `all?search${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (category) base += `&category=${category}`;
        if (sort) base += `&sort=${sort}`;

        return base;
      },
    }),
    newProduct: builder.mutation<MessageResponse, NewProductResponse>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation
} = productAPI;
