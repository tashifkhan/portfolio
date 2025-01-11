"use client";

import { useAuth } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import UpdateForm from "@/components/UpdateForm";

export default function UpdatePage() {
	const { isAuthenticated } = useAuth();

	return (
		<main className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{isAuthenticated ? <UpdateForm /> : <LoginForm />}
			</div>
		</main>
	);
}
