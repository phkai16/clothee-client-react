import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getProductsByCategory: build.query({
      query: (categoryName) => `/products?category=${categoryName}`,
      providesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (id) => `/products/find/${id}`,
      providesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductQuery,
  endpoints,
} = productApi;
