import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('Token'));




    useEffect(() => {
        if (token) {
            fetch("https://localhost:44333/api/Account/user", {
                headers: {
                    authorization: `bearer ${localStorage.getItem('Token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

    }, [token])


    console.log(token);
    console.log(user);


    const handleLogout = () => {
        // Perform logout actions
        localStorage.removeItem('Token'); // Remove token from localStorage
        setToken(null); // Clear token state
        setUser({}); // Clear user state
    };

    const authInfo = {
        user,
        loading,
        setLoading,
        setToken,
        token,
        setUser,
        handleLogout

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;