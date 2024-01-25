import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => ({
        url: "latest",
      }),
      providesTags: ["products"],
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => ({
        url: `admin-products?id=${id}`,
      }),
      providesTags: ["products"],
    }),
    productDetails: builder.query<ProductResponse, string>({
      query: (id) => ({
        url: id,
      }),
      providesTags: ["products"],
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => ({
        url: `categories`,
      }),
      providesTags: ["products"],
    }),

    searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["products"],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ id, formData }) => ({
        url: `new?$id=${id}`,
        body: formData,
        method: "POST",
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        body: formData,
        method: "PUT",
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useProductDetailsQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
