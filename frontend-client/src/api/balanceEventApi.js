import {baseApi} from "../app/baseApi";


export const balanceEventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBalanceEventMe: build.query({
            query: () => ({
                url: "/balance/events/me",
                method: "GET",
            }),
            providesTags: ['BalanceEvent']
        }),
    })
})

export const {useGetBalanceEventMeQuery} = balanceEventApi;