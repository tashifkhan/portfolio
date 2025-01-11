import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdateForm() {
	return (
		<div className="relative backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-2xl p-6 shadow-xl border border-none">
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/20 dark:from-orange-800/5 dark:to-amber-900/20 rounded-2xl -z-10" />
			<form className="space-y-4">
				<h2 className="text-2xl font-bold text-white mb-6 font-mono text-center">
					Update Portfolio
				</h2>
				<Input
					type="text"
					placeholder="Project Name"
					className="bg-white/5 text-gray-400 border-none transition-colors"
				/>
				<Input
					type="text"
					placeholder="Project Description"
					className="bg-white/5 text-gray-400 border-none transition-colors"
				/>
				<Input
					type="url"
					placeholder="Project URL"
					className="bg-white/5 text-gray-400 border-none transition-colors"
				/>
				<Button
					type="submit"
					className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-colors text-white"
				>
					Save Changes
				</Button>
			</form>
		</div>
	);
}
