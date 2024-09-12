import {baseApi} from "../app/baseApi";


export const balanceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBalanceByUserId: build.query({
            query: ({userId}) => ({
                url: "/balance",
                method: "GET",
                params: {userId}
            }),
            providesTags: ['Balance']
        }),
    })
})

export const {useGetBalanceByUserIdQuery} = balanceApi;