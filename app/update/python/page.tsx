"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ui/loader";
import type { PyodideInterface } from "@/types/pyodide";

// Extend Window interface
declare global {
	interface Window {
		loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
	}
}

export default function PythonPage() {
	const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
	const [output, setOutput] = useState("");
	const [input, setInput] = useState(`import sys
print("Python version:", sys.version)
print("Hello from Pyodide! 🐍")`);
	const [isRunning, setIsRunning] = useState(false);

	// once on the client, wait for window.loadPyodide
	useEffect(() => {
		if (typeof window === "undefined" || pyodide) return;
		if (window.loadPyodide) {
			window
				.loadPyodide({
					indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
				})
				.then((py: PyodideInterface) => setPyodide(py));
		}
	}, [pyodide]);

	const runPython = async () => {
		if (!pyodide) return;
		setIsRunning(true);
		try {
			const result = await pyodide.runPythonAsync(input);
			setOutput(result || "Code executed successfully!");
		} catch (error) {
			setOutput(
				`Error: ${error instanceof Error ? error.message : String(error)}`
			);
		} finally {
			setIsRunning(false);
		}
	};

	const clearOutput = () => {
		setOutput("");
	};

	const installPackage = async (packageName: string) => {
		if (!pyodide) return;
		setIsRunning(true);
		try {
			await pyodide.loadPackage(["micropip"]);
			await pyodide.runPythonAsync(`
import micropip
await micropip.install("${packageName}")
`);
			setOutput(`Successfully installed ${packageName}!`);
		} catch (error) {
			setOutput(
				`Error installing ${packageName}: ${
					error instanceof Error ? error.message : String(error)
				}`
			);
		} finally {
			setIsRunning(false);
		}
	};

	return (
		<div className="p-4">
			{/* load the Pyodide runtime before React hydrates */}
			<Script
				src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
				strategy="beforeInteractive"
			/>

			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">
						🚀 Python REPL with Pyodide
					</h1>
					<p className="text-gray-600">
						Run Python code directly in your browser using Pyodide
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Input Section */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<span>🐍 Python Code</span>
								{!pyodide && <Loader className="w-4 h-4" />}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Textarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Enter your Python code here..."
								className="min-h-[300px] font-mono text-sm"
								disabled={!pyodide}
							/>
							<div className="flex gap-2">
								<Button
									onClick={runPython}
									disabled={!pyodide || isRunning}
									className="flex-1"
								>
									{isRunning ? (
										<>
											<Loader className="w-4 h-4 mr-2" />
											Running...
										</>
									) : pyodide ? (
										"Run Python 🐍"
									) : (
										"Loading Pyodide…"
									)}
								</Button>
								<Button
									onClick={clearOutput}
									variant="outline"
									disabled={!output}
								>
									Clear Output
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Output Section */}
					<Card>
						<CardHeader>
							<CardTitle>📤 Output</CardTitle>
						</CardHeader>
						<CardContent>
							<pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[400px] font-mono text-sm">
								{output || "Output will appear here..."}
							</pre>
						</CardContent>
					</Card>
				</div>

				{/* Package Installation */}
				<Card className="mt-6">
					<CardHeader>
						<CardTitle>📦 Install Packages</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{["numpy", "pandas", "matplotlib", "requests", "pillow"].map(
								(pkg) => (
									<Button
										key={pkg}
										onClick={() => installPackage(pkg)}
										disabled={!pyodide || isRunning}
										variant="outline"
										size="sm"
									>
										Install {pkg}
									</Button>
								)
							)}
						</div>
						<p className="text-sm text-gray-600 mt-2">
							Note: Package installation may take a moment and requires an
							internet connection.
						</p>
					</CardContent>
				</Card>

				{/* Examples */}
				<Card className="mt-6">
					<CardHeader>
						<CardTitle>💡 Examples</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h4 className="font-semibold mb-2">Basic Math</h4>
								<pre className="bg-gray-100 p-2 rounded text-sm">
									{`import math
print("Pi:", math.pi)
print("Square root of 16:", math.sqrt(16))`}
								</pre>
							</div>
							<div>
								<h4 className="font-semibold mb-2">List Operations</h4>
								<pre className="bg-gray-100 p-2 rounded text-sm">
									{`numbers = [1, 2, 3, 4, 5]
print("Sum:", sum(numbers))
print("Average:", sum(numbers) / len(numbers))`}
								</pre>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
