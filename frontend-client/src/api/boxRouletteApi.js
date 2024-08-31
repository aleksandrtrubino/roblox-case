import {baseApi} from "../app/baseApi";

export const boxRouletteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        spinRoulette: build.mutation({
            query: ({boxId}) => ({
                url: `/roulette/spin/${boxId}`,
                method: "POST",
            }),
            invalidatesTags: ['Inventory','Balance']
        })
    })
})

export const {useSpinRouletteMutation} = boxRouletteApi