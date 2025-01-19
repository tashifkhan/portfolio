import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	login: (email: string, password: string) => boolean;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	login: (email: string, password: string) => {
		const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
		const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

		if (!adminEmail || !adminPassword) {
			console.error("Environment variables not properly loaded");
			return false;
		}

		const isValid = email === adminEmail && password === adminPassword;
		set({ isAuthenticated: isValid });
		return isValid;
	},
	logout: () => set({ isAuthenticated: false }),
}));

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	token: string | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("auth_token");
		if (storedToken) {
			setToken(storedToken);
			setIsAuthenticated(true);
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) return false;

			const { token } = await response.json();
			localStorage.setItem("auth_token", token);
			setToken(token);
			setIsAuthenticated(true);
			return true;
		} catch (error) {
			return false;
		}
	};

	const logout = () => {
		localStorage.removeItem("auth_token");
		setToken(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => useContext(AuthContext);
