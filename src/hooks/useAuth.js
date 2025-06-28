import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import authService from "../api/appwrite/auth";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => authService.getCurrentUser(),
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    const { setUser } = useAuthStore();
    return useMutation({
        mutationFn: ({ email, password }) => authService.login({ email, password }),
        onSuccess: (user) => {
            setUser(user);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

export const useSignup = () => {
    return useMutation({
        mutationFn: ({ email, password, name }) => authService.createAccount({ email, password, name }),
         onSuccess: (userAccount) => {
            console.log("Account created successfully. Please verify your email.", userAccount);
        },
    });
};

export const useSendVerificationEmail = () => {
    return useMutation({
        mutationFn: () => authService.sendVerificationEmail(),
        onSuccess: () => {
            console.log("Verification email sent successfully!");
        },
        onError: (error) => {
            console.error("Failed to send verification email:", error);
        }
    });
};

export const useConfirmVerification = () => {
    return useMutation({
        mutationFn: ({ userId, secret }) => authService.confirmEmailVerification(userId, secret),
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { logout } = useAuthStore();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            logout();
        },
    });
};
