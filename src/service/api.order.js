import { baseApi } from "./baseApi";
import toast from "react-hot-toast";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: (id) => `orders/${id}`,
      providesTags: ["Order"],
    }),
    addOrder: build.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Order"],
      transformResponse: (response, meta, arg) => {
        toast.success("Order created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrderQuery, useAddOrderMutation, endpoints } = orderApi;
