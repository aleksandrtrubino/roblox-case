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
        getAllWithdrawals: build.query({
            query: () =>({
                url: '/withdrawals',
                method: 'GET'
            }),
            providesTags: ['Withdrawal']
        }),
        cancelWithdrawal: build.mutation({
            query: ({withdrawalId}) =>({
                url: `/withdrawals/${withdrawalId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Withdrawal','Inventory']
        })
    })
})

export const {useGetWithdrawalsByUserIdQuery, useGetAllWithdrawalsQuery, useCancelWithdrawalMutation} = withdrawalApi;