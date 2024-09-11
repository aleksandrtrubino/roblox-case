import { baseApi } from "../app/baseApi";

export const emailApi = baseApi.injectEndpoints({
    endpoints: build => ({
        confirmEmail: build.mutation({
            query: (token) => ({
                url: '/email-confirmation',
                method: 'GET',
                params: { token }
            }),
            invalidatesTags: ['Email']
        }),
        sendEmail: build.mutation({
            query: (email) => ({
                url: '/email-confirmation',
                method: 'POST',
                params: { email }
            }),
            invalidatesTags: ['Email']
        })
    })
});

export const { useConfirmEmailMutation, useSendEmailMutation } = emailApi;
