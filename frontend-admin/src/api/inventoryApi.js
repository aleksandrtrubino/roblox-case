import {baseApi} from "../app/baseApi";

export const inventoryApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getInventoryByUserId: build.query({
            query: ({userId}) => ({
                url: '/inventory',
                method: 'GET',
                params: {userId}
            }),
            providesTags: ['Inventory']
        })
    })
})

export const {useGetInventoryByUserIdQuery} = inventoryApi;