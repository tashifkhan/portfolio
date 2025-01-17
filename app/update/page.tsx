import { Suspense } from "react";
import UpdateForm from "@/components/admin/UpdateForm";
import { Loader } from "@/components/ui/loader";

export default function UpdatePage() {
	return (
		<main className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<Suspense fallback={<Loader />}>
					<UpdateForm />
				</Suspense>
			</div>
		</main>
	);
}
