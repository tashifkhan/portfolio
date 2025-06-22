"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UpdateSocialsFormProps {
	onSuccess: () => void;
}

export default function UpdateSocialsForm({
	onSuccess,
}: UpdateSocialsFormProps) {
	const [socialData, setSocialData] = useState({
		InstaID: "",
		LeetCodeID: "",
		GithubID: "",
		LinkedInID: "",
		TwitterID: "",
		ResumeLink: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchSocialData();
	}, []);

	const fetchSocialData = async () => {
		try {
			const response = await fetch("/api/socials");
			if (response.ok) {
				const data = await response.json();
				setSocialData({
					InstaID: data.InstaID || "",
					LeetCodeID: data.LeetCodeID || "",
					GithubID: data.GithubID || "",
					LinkedInID: data.LinkedInID || "",
					TwitterID: data.TwitterID || "",
					ResumeLink: data.ResumeLink || "",
				});
			}
		} catch (error) {
			console.error("Error fetching social data:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/socials", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(socialData),
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error("Error updating social data:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<p className="text-gray-300 mb-4">
				Update your social media information:
			</p>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Instagram Username
				</label>
				<Input
					placeholder="e.g., khan_tashif"
					value={socialData.InstaID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, InstaID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					LeetCode Username
				</label>
				<Input
					placeholder="e.g., tashif-khan"
					value={socialData.LeetCodeID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, LeetCodeID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					GitHub Username
				</label>
				<Input
					placeholder="e.g., tashifkhan"
					value={socialData.GithubID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, GithubID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					LinkedIn Profile ID
				</label>
				<Input
					placeholder="e.g., tashif-ahmad-khan-982304244"
					value={socialData.LinkedInID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, LinkedInID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Twitter Username
				</label>
				<Input
					placeholder="e.g., tashifkhan_"
					value={socialData.TwitterID}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, TwitterID: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-2">
					Resume Link
				</label>
				<Input
					placeholder="https://yourwebsite.com/resume.pdf"
					value={socialData.ResumeLink}
					onChange={(e) =>
						setSocialData((prev) => ({ ...prev, ResumeLink: e.target.value }))
					}
					className="bg-white/5 text-gray-300 border-orange-500/20"
				/>
			</div>

			<Button
				type="submit"
				disabled={loading}
				className="w-full bg-orange-500 hover:bg-orange-600"
			>
				{loading ? "Updating..." : "Update Social Links"}
			</Button>
		</form>
	);
}
