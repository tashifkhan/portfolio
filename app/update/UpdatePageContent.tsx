"use client";

import UpdateForm from "@/components/admin/UpdateForm";
import { LoginForm } from "@/components/admin/LoginForm";
import { useAuth } from "@/lib/auth";

export function UpdatePageContent() {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <UpdateForm /> : <LoginForm />;
}
