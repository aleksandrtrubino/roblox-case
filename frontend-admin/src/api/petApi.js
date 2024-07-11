import {baseApi} from "../app/baseApi";

export const petApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPets: build.query({
            query: () => ({
                url: "/pets",
                method: "GET",
            }),
            providesTags: ['Pets']
        }),
        createPet: build.mutation({
            query: ({ petDto, imageFile }) => {
                const formData = new FormData();
                formData.append('data', JSON.stringify(petDto));
                formData.append('image', imageFile);

                return {
                    url: "/pets",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ['Pets']
        }),
        updatePet: build.mutation({
            query: ({petId, petDto, imageFile }) => {
                const formData = new FormData();
                formData.append('data', JSON.stringify(petDto));
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                return {
                    url: `/pets/${petId}`,
                    method: "PATCH",
                    body: formData,
                };
            },
            invalidatesTags: ['Pets']
        }),
        deletePet: build.mutation({
            query: ({petId}) => ({
                url: `/pets/${petId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Pets']
        })
    })
})

export const { useGetPetsQuery, useCreatePetMutation, useUpdatePetMutation, useDeletePetMutation } = petApi;
