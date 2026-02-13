import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // 1. Check local users first (persistence for newly signed up accounts)
            const localUsers = JSON.parse(localStorage.getItem("local_users") || "[]");
            const localMatch = localUsers.find(u => u.email === email && u.password === password);

            if (localMatch) {
                const userData = {
                    email: localMatch.email,
                    username: localMatch.username,
                    id: localMatch.id
                };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userName", localMatch.username);
                localStorage.setItem("userId", localMatch.id);
                return { success: true };
            }

            // 2. Fetch from Fakestore API if not found locally
            const response = await fetch("https://fakestoreapi.com/users");
            if (!response.ok) throw new Error("Failed to fetch users");
            const users = await response.json();

            const apiMatch = users.find(u => u.email === email && u.password === password);

            if (apiMatch) {
                const userData = {
                    email: apiMatch.email,
                    username: apiMatch.username,
                    id: apiMatch.id
                };

                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userName", apiMatch.username);
                localStorage.setItem("userId", apiMatch.id);

                return { success: true };
            } else {
                return { success: false, error: "Invalid email or password" };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, username) => {
        try {
            const newUserObj = {
                email: email,
                username: username || email.split('@')[0],
                password: password,
                name: { firstname: 'John', lastname: 'Doe' },
                address: { city: 'kilcoole', street: '7835 new road', number: 3, zipcode: '12926-3874', geolocation: { lat: '-37.3159', long: '81.1496' } },
                phone: '1-570-236-7033'
            };

            // Call API as well (Fakestore returns a mock ID)
            const response = await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUserObj),
            });

            const result = await response.json();
            const userId = result.id || Math.floor(Math.random() * 1000);

            // Persist locally so login works later
            const localUsers = JSON.parse(localStorage.getItem("local_users") || "[]");
            const enhancedUser = { ...newUserObj, id: userId };
            localUsers.push(enhancedUser);
            localStorage.setItem("local_users", JSON.stringify(localUsers));

            // Set as current user
            const userData = { email, username: enhancedUser.username, id: userId };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("userName", enhancedUser.username);
            localStorage.setItem("userId", userId);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
