import { leadApiSlice } from "@/redux/api/httpSlice";
import { type TLead } from "@/types/lead.types";
import { type TGlobalResponse } from "@/types/index.types";

const leadApi = leadApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation<TGlobalResponse<TLead>, Partial<TLead>>({
      query: (payload) => ({
        url: "/leads/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateLeadMutation } = leadApi;
