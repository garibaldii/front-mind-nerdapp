'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getUserById } from '@/service/UserService';
import { IUser } from '@/interface/IUser';
import { jwtDecode } from 'jwt-decode';

type tokenPayload = {
    email: string;
    id: string;
};

type UserContextType = {
    user: IUser | null;
    loading: boolean;
    refreshUserData: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode<tokenPayload>(token);
            const userId = Number(decoded.id);
            const userData = await getUserById(userId);
            setUser(userData);
        } catch (error) {
            console.error('Erro ao buscar usuário logado:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, refreshUserData: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
};
