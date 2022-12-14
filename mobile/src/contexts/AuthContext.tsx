import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    avatarUrl: string;
    name: string;
}

export interface AuthContextDataProps {
    signIn: () => Promise<void>;
    isUserLoading: boolean;
    user: UserProps;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '972974595905-ns5vfvhpmi83pgkv10i97kqj0eu891sp.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email'],
    });

    async function signIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        try {
            setIsUserLoading(true);

            const tokenResponse = await api.post('users', { access_token });
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get('me');
            setUser(userInfoResponse.data.user);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setIsUserLoading(false);
        }
    }

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication?.accessToken);
        }
    }, [response]);

    return (
        <AuthContext.Provider
            value={{
                isUserLoading,
                signIn,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}