import {baseApi} from "../app/baseApi";


export const petCardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPetCards: build.query({
            query: () => ({
                url: "/pet-cards",
                method: "GET",
            }),
            providesTags: ['PetCards']
        }),
        createPetCard: build.mutation({
            query: ({ petCardDto }) => {
                return {
                    url: "/pet-cards",
                    method: "POST",
                    body: petCardDto,
                };
            },
            invalidatesTags: ['PetCards']
        }),
        updatePetCard: build.mutation({
            query: ({petCardId, petCardDto}) => {
                return {
                    url: `/pet-cards/${petCardId}`,
                    method: "PATCH",
                    body: petCardDto,
                };
            },
            invalidatesTags: ['PetCards']
        }),
        deletePetCard: build.mutation({
            query: ({petCardId}) => ({
                url: `/pet-cards/${petCardId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['PetCards']
        })
    })
})

export const {useGetPetCardsQuery, useCreatePetCardMutation, useUpdatePetCardMutation, useDeletePetCardMutation} = petCardApi