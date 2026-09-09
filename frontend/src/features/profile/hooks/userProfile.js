import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getMyProfile,
    updateMyProfile,
    deleteMyProfile,
} from "../services/profileService";

import {
    currentUserQueryKey,
} from "../../auth/hooks/useAuth";


export const profileQueryKey = ["my-profile"];


export function useProfile() {
    const queryClient = useQueryClient();


    const profileQuery =
        useQuery({
            queryKey: profileQueryKey,

            queryFn: getMyProfile,

            staleTime: Infinity,
        });


    const updateMutation =
        useMutation({
            mutationKey: ["update-my-profile"],

            mutationFn: updateMyProfile,

            onSuccess: (updatedUser) => {
                queryClient.setQueryData(
                    profileQueryKey,
                    updatedUser
                );

                queryClient.setQueryData(
                    currentUserQueryKey,
                    updatedUser
                );
            },
        });


    const deleteMutation =
        useMutation({
            mutationKey: ["delete-my-profile"],

            mutationFn: deleteMyProfile,

            onSuccess:
                async () => {
                    queryClient.clear();
                },
        });


    return {
        profile:
            profileQuery.data ?? null,

        isLoading:
            profileQuery.isLoading,

        error:
            profileQuery.error ?? null,

        updateProfile:
            updateMutation.mutateAsync,

        deleteProfile:
            deleteMutation.mutateAsync,

        isSaving:
            updateMutation.isPending,

        isDeleting:
            deleteMutation.isPending,

        saveError:
            updateMutation.error ??
            null,

        deleteError:
            deleteMutation.error ??
            null,
    };
}