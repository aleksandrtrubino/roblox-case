import {baseApi} from "../app/baseApi";


export const sellingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sellMe: build.mutation({
            query: ({inventoryItemId}) => ({
                url: `/selling/me?inventoryItemId=${inventoryItemId}`,
                method: "POST",
            }),
            invalidatesTags: ['Balance', 'Inventory']
        })
    })
})

export const { useSellMeMutation} = sellingApi;