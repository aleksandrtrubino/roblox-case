import {baseApi} from "../app/baseApi";


export const promoCodeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPromoCode: build.query({
            query: ({promoCode}) => ({
                url: `/promo-codes/by-code/${promoCode}`,
                method: "GET",
            }),
        }),
    })
})

export const {useGetPromoCodeQuery, useLazyGetPromoCodeQuery} = promoCodeApi;