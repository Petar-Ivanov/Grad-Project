import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    register,
    login,
    getCurrentUser,
    logout,
} from "../services/authService";


export const currentUserQueryKey = ["current-user"];


export function useAuth() {
    const queryClient = useQueryClient();


    const userQuery = useQuery({
        queryKey: currentUserQueryKey,

        queryFn: getCurrentUser,

        retry: false,

        staleTime: Infinity,
    });


    const loginMutation = useMutation({
        mutationFn: login,

        onSuccess: (user) => {
            queryClient.setQueryData(
                currentUserQueryKey,
                user
            );
        },
    });


    const registerMutation = useMutation({
        mutationFn: register,

        onSuccess: (user) => {
            queryClient.setQueryData(
                currentUserQueryKey,
                user
            );
        },
    });


    const logoutMutation = useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.setQueryData(
                currentUserQueryKey,
                null
            );

            //queryClient.removeQueries();
            queryClient.clear();
        },
    });


    const isAuthenticated = Boolean(userQuery.data);


    return {
        user:
            userQuery.data ?? null,

        isAuthenticated,

        isLoading:
            userQuery.isLoading,

        error:
            userQuery.error ?? null,


        login:
            loginMutation.mutateAsync,

        register:
            registerMutation.mutateAsync,

        logout:
            logoutMutation.mutateAsync,


        isLoggingIn:
            loginMutation.isPending,

        isRegistering:
            registerMutation.isPending,

        isLoggingOut:
            logoutMutation.isPending,


        loginError:
            loginMutation.error ?? null,

        registerError:
            registerMutation.error ?? null,

        logoutError:
            logoutMutation.error ?? null,
    };
}