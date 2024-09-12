import {baseApi} from "../app/baseApi";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserMe: build.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ['User']
        }),
        editUserMe: build.mutation({
            query: ({userDto}) => ({
                url: "/users/me",
                method: "PUT",
                body: userDto
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserMeQuery, useEditUserMeMutation} = userApi;