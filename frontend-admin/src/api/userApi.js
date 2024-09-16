import {baseApi} from "../app/baseApi";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserMe: build.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            })
        }),
        getUserById: build.query({
            query: ({userId}) =>({
                url: `/users/${userId}`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        getAllUsers: build.query({
            query: ({authorityId, search}) => ({
                url: '/users',
                method: 'GET',
                params: {authorityId, search}
            }),
            providesTags: ['User']
        }),
        createUser: build.mutation({
            query: (userDto) =>({
                url: `/users`,
                method: 'POST',
                body: userDto
            }),
            invalidatesTags: ['User']
        }),
        patchUserById: build.mutation({
            query: ({userId, userDto}) =>({
                url: `/users/${userId}`,
                method: 'PUT',
                body: userDto
            }),
            invalidatesTags: ['User']
        }),
        deleteUserById: build.mutation({
            query: (userId) =>({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserMeQuery, useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, usePatchUserByIdMutation, useDeleteUserByIdMutation} = userApi;