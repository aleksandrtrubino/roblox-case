import {baseApi} from "../app/baseApi";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserMe: build.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            })
        })
    })
})

export const { useGetUserMeQuery} = userApi;