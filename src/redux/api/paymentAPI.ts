import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MessageResponse
} from "../../types/api-types";

export const paymentAPI = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`,
  }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    allCoupons: builder.query<any, string>({
      query: (id) => ({
        url: `coupon/all?id=${id}`,
      }),
      providesTags: ["payment"],
    }),


    singleCouponDetail: builder.query<any, any>({
      query: ({ userId, couponId }) => ({
        url: `coupon/${couponId}?id=${userId}`,
      }),
      providesTags: ["payment"],
    }),


    couponDetail: builder.mutation<MessageResponse, any>({
      query: ({ id, coupon, amount }) => ({
        url: `coupon/new?id=${id}`,
        method: "POST",
        body: { coupon, amount },
      }),
      invalidatesTags: ["payment"],
    }),
    updateCoupon: builder.mutation<any, any>({
      query: ({ id, couponId, coupon, amount }) => ({
        url: `coupon/${couponId}?id=${id}`,
        method: "PUT",
        body: { coupon, amount },
      }),
      invalidatesTags: ["payment"],
    }),
    deleteCoupon: builder.mutation<any, any>({
      query: ({ id, couponId }) => ({
        url: `coupon/${couponId}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const {
  useAllCouponsQuery,
  useCouponDetailMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useSingleCouponDetailQuery,
} = paymentAPI;
