"use client";

import { useEffect, useState } from "react";
import UpdateForm from "@/components/admin/UpdateForm";
import { LoginForm } from "@/components/admin/LoginForm";
import { useAuthContext } from "@/lib/auth";
import { Loader } from "@/components/ui/loader";

export function UpdatePageContent() {
	const { isAuthenticated } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Short timeout to prevent flash of login form
		const timer = setTimeout(() => setIsLoading(false), 500);
		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <Loader className="w-8 h-8" />;
	}

	return isAuthenticated ? <UpdateForm /> : <LoginForm />;
}
