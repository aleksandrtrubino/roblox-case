import {baseApi} from "../app/baseApi";

export const withdrawalApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getWithdrawalsMe: build.query({
            query: () =>({
                url: "/withdrawals/me",
                method: "GET"
            }),
            providesTags: ['Withdrawal']
        }),
        withdraw: build.mutation({
            query: ({inventoryItemId: inventoryItemId}) => ({
                url: `/withdrawals/withdraw/me?petCardId=${inventoryItemId}`,
                method: "POST",
            }),
            invalidatesTags: ['Inventory', 'Withdrawal']
        })
    })
})

export const {useGetWithdrawalsMeQuery, useWithdrawMutation} = withdrawalApi;