import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { getMe } from './services/auth.api';
import Loading from '../../shared/Loading';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authLoading, setAuthLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)


    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await getMe();
                setUser(response.user);
            } catch (err) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        initAuth();
    }, []);

    if (authLoading) {
        return <Loading text='Fetching user' />
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}