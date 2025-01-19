"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				router.push("/update");
				router.refresh();
			} else {
				setError(data.error || "Invalid credentials");
			}
		} catch (err) {
			setError("An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-6 shadow-xl border border-none">
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />
			<form onSubmit={handleSubmit} className="space-y-4">
				<h2 className="text-2xl font-bold text-white mb-6 font-mono text-center">
					Admin Login
				</h2>
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="bg-white/5 text-gray-400 border-none transition-colors"
				/>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="bg-white/5 text-gray-400 border-orange-500/5 transition-colors"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
					>
						{showPassword ? <EyeOff /> : <Eye />}
					</button>
				</div>
				{error && (
					<div className="flex justify-center">
						<p className="text-orange-400/50 text-sm">{error}</p>
					</div>
				)}
				<Button
					type="submit"
					disabled={isLoading}
					className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-colors text-white"
				>
					{isLoading ? "Logging in..." : "Login"}
				</Button>
			</form>
		</div>
	);
}
