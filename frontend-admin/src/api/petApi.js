import {baseApi} from "../app/baseApi";


export const petApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPets: build.query({
            query: () => ({
                url: "/pets",
                method: "GET",
            })
        })
    })
})

export const { useGetPetsQuery} = petApi;