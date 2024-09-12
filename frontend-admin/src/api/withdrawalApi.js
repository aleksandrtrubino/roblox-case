import {baseApi} from "../app/baseApi";

export const withdrawalApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getWithdrawalsByUserId: build.query({
            query: ({userId}) =>({
                url: "/withdrawals",
                method: "GET",
                params: {userId}
            }),
            providesTags: ['Withdrawal']
        }),
    })
})

export const {useGetWithdrawalsByUserIdQuery, useWithdrawMutation} = withdrawalApi;