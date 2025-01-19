"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	login: async () => false,
	logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const res = await fetch("/api/auth/check");
			setIsAuthenticated(res.ok);
		} catch (err) {
			setIsAuthenticated(false);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (res.ok) {
				setIsAuthenticated(true);
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	};

	const logout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			setIsAuthenticated(false);
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => useContext(AuthContext);
