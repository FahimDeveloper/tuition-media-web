import { authApiSlice } from "@/redux/api/httpSlice";

const leadApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation({
      query: (payload) => ({
        url: "/leads/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateLeadMutation } = leadApi;
