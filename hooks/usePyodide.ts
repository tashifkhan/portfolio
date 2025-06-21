import { useEffect, useState, useCallback } from "react";
import type { PyodideInterface } from "@/types/pyodide";

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
const INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/";

function loadPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("pyodide-script")) {
      // Script already exists, wait for it to be ready
      const checkReady = () => {
        if ((window as any).loadPyodide) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
      return;
    }
    
    const script = document.createElement("script");
    script.id = "pyodide-script";
    script.src = PYODIDE_URL;
    script.async = true;
    script.onload = () => {
      // Wait a bit more for the script to initialize
      setTimeout(() => {
        if ((window as any).loadPyodide) {
          resolve();
        } else {
          reject(new Error("Pyodide failed to initialize"));
        }
      }, 1000);
    };
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

export function usePyodide() {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function load() {
      setLoading(true);
      setError(null);
      
      try {
        await loadPyodideScript();
        
        // Now window.loadPyodide should be available
        if (!(window as any).loadPyodide) {
          throw new Error("Pyodide not available after script load");
        }
        
        const py = await (window as any).loadPyodide({ indexURL: INDEX_URL });
        await py.loadPackage(["micropip"]);
        
        if (!cancelled) {
          setPyodide(py);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load Pyodide");
          console.error("Pyodide loading error:", e);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    if (!pyodide) {
      load();
    }
    
    return () => {
      cancelled = true;
    };
  }, [pyodide]);

  // Helper to install a package via micropip
  const installPackage = useCallback(
    async (packageName: string) => {
      if (!pyodide) throw new Error("Pyodide not loaded");
      await pyodide.runPythonAsync(`
import micropip
await micropip.install("${packageName}")
`);
    },
    [pyodide]
  );

  return { pyodide, loading, error, installPackage };
} 