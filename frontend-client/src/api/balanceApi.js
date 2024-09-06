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
            query: ({sum, promoCode}) => ({
                url: "/balance/deposit/me",
                method: "POST",
                params: {sum, promoCode}
            }),
            invalidatesTags: ['Balance', 'BalanceEvent']
        }))
    })
})

export const {useGetBalanceMeQuery, useDepositMeMutation} = balanceApi;