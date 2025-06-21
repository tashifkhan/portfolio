// Export the interface for use in other files
export interface PyodideInterface {
  loadPackage(packages: string[]): Promise<void>;
  runPythonAsync(code: string): Promise<any>;
  runPython(code: string): any;
  globals: any;
}

// Global declaration for window.loadPyodide
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
} 