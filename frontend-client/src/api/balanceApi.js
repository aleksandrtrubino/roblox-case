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
    })
})

export const {useGetBalanceMeQuery} = balanceApi;