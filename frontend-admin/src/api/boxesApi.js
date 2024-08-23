import { baseApi } from "../app/baseApi";

export const boxesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBoxes: build.query({
            query: () => ({
                url: "/boxes",
                method: "GET",
            }),
            providesTags: ['Boxes']
        }),
        getBoxById: build.query({
            query: (boxId) => ({
                url: `/boxes/${boxId}`,
                method: "GET",
            }),
            providesTags: ['Boxes']
        }),
        createBox: build.mutation({
            query: (boxDto) => ({
                url: "/boxes",
                method: "POST",
                body: boxDto,
            }),
            invalidatesTags: ['Boxes']
        }),
        updateBox: build.mutation({
            query: ({ boxId, boxDto }) => ({
                url: `/boxes/${boxId}`,
                method: "PATCH",
                body: boxDto,
            }),
            invalidatesTags: ['Boxes']
        }),
        deleteBox: build.mutation({
            query: (boxId) => ({
                url: `/boxes/${boxId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Boxes']
        })
    })
})

export const { useGetBoxesQuery, useGetBoxByIdQuery, useCreateBoxMutation, useUpdateBoxMutation, useDeleteBoxMutation } = boxesApi;
