import {baseApi} from "../app/baseApi";


export const balanceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBalanceMe: build.query({
            query: () => ({
                url: "/balance/me",
                method: "GET",
            }),
            providesTags: ['Balance']
        }),
        depositMe: build.mutation(({
            query: () => ({
                url: "/balance/deposit/me",
                method: "POST",
            }),
            invalidatesTags: ['Balance']
        }))
    })
})

export const {useGetBalanceMeQuery, useDepositMeMutation} = balanceApi;