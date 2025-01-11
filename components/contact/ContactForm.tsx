"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, MessageSquare, Send } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),

	subject: z.string().min(5, "Subject must be at least 5 characters"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		setIsSubmitting(true);
		try {
			// Create mailto URL with form data
			const mailtoUrl = `mailto:develop@tashif.codes?subject=${encodeURIComponent(
				data.subject
			)}&body=${encodeURIComponent(`From: ${data.name} \n\n${data.message}`)}`;

			// Open default mail client
			window.location.href = mailtoUrl;

			toast({
				title: "Opening mail client",
				description:
					"Your message will open in your default email application.",
			});

			form.reset();
		} catch (error) {
			toast({
				title: "Error",
				description: "Unable to open mail client. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-2xl mx-auto"
		>
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-amber-900/20 to-transparent rounded-xl blur-2xl" />
				<div className="relative p-8 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-amber-700/20 transition-all duration-300">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative group">
												<User className="absolute left-3 top-3 h-4 w-4 text-amber-600/70 transition-colors group-hover:text-amber-600" />
												<Input
													placeholder="Name"
													className="pl-9 bg-white/5 border-white/10 focus:border-amber-700/50 transition-all hover:bg-white/10"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="subject"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative group">
												<MessageSquare className="absolute left-3 top-3 h-4 w-4 text-amber-600/70 transition-colors group-hover:text-amber-600" />
												<Input
													placeholder="Subject"
													className="pl-9 bg-white/5 border-white/10 focus:border-amber-700/50 transition-all hover:bg-white/10"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												placeholder="Your message"
												className="min-h-[120px] resize-none bg-white/5 border-white/10 focus:border-amber-900/50 transition-all hover:bg-white/10"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full bg-amber-900/80 hover:bg-amber-600 text-white backdrop-blur-sm transition-all duration-300"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									"Sending..."
								) : (
									<>
										Send Message
										<Send className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</motion.div>
	);
}
