import {baseApi} from "../app/baseApi";


export const promoCodeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPromoCodes: build.query({
            query: () => ({
                url: `/promo-codes`,
                method: "GET",
            }),
            providesTags: ['Promocode']
        }),
        createPromoCode: build.mutation({
            query: (promoCodeDto) => ({
                url: '/promo-codes',
                method: 'POST',
                body: promoCodeDto
            }),
            invalidatesTags: ['Promocode']
        }),
        updatePromoCode: build.mutation({
            query: ({promoCodeId, promoCodeDto}) => ({
                url: `/promo-codes/${promoCodeId}`,
                method: 'PUT',
                body: promoCodeDto
            }),
            invalidatesTags: ['Promocode']
        }),
        deletePromoCode: build.mutation({
            query: (promoCodeId) => ({
                url: `/promo-codes/${promoCodeId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Promocode']
        })
    })
})

export const {useGetAllPromoCodesQuery, useCreatePromoCodeMutation, useUpdatePromoCodeMutation, useDeletePromoCodeMutation} = promoCodeApi;