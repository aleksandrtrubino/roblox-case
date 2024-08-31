import {baseApi} from "../app/baseApi";

export const inventoryApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getInventoryMe: build.query({
            query: () => ({
                url: '/inventory/me',
                method: 'GET'
            }),
            providesTags: ['Inventory']
        })
    })
})

export const {useGetInventoryMeQuery} = inventoryApi;