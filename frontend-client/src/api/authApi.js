import {baseApi} from "../app/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials }
            })
        }),
        register: build.mutation({
            query: (user) => ({
                url: "/user/me",
                method: "POST",
                body: {...user}
            })
        }),
        logout: build.mutation({
            query: () =>({
                url: '/auth',
                method: 'DELETE'
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;