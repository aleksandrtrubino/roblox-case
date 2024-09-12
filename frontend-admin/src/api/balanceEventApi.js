import {baseApi} from "../app/baseApi";


export const balanceEventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBalanceEventByUserId: build.query({
            query: ({userId}) => ({
                url: "/balance/events",
                method: "GET",
                params: {userId}
            }),
            providesTags: ['BalanceEvent']
        }),
    })
})

export const {useGetBalanceEventByUserIdQuery} = balanceEventApi;