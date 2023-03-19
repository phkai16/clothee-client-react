import { baseApi } from "./baseApi";
import toast from "react-hot-toast";
import { setAccount } from "../redux/user.slice";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/find/${id}`,
      providesTags: ["User"],
    }),
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("success!", data);
          dispatch(setAccount(data));
          localStorage.setItem("token", data.accessToken);
        } catch (err) {
          console.log("error... ", err);
        }
      },
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => {
        toast.success("User created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => {
        toast.success("User updated!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => {
        toast.success("User has been deleted...");
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

export const {
  useLoginMutation,
  useGetUserQuery,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  endpoints,
} = userApi;
