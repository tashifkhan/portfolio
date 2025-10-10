"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EducationItem = {
  title: string;
  institution: string;
  score: string;
  duration: string;
};

type ResponsibilityItem = {
  title: string;
  organization: string;
  duration: string;
  type: string;
};

type DocShape = {
  _id?: string;
  educationData: EducationItem[];
  responsibilitiesData: ResponsibilityItem[];
};

interface Props {
  initialData?: DocShape[] | any;
  onSuccess: () => void;
}

export default function EditEducationForm({ initialData, onSuccess }: Props) {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [responsibilities, setResponsibilities] = useState<ResponsibilityItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Normalize incoming shape (UpdateForm passes array from /api/edu)
  const normalized = useMemo<DocShape | null>(() => {
    if (!initialData) return null;
    if (Array.isArray(initialData) && initialData.length > 0) {
      const d = initialData[0];
      if (d && (d.educationData || d.responsibilitiesData)) return d as DocShape;
    }
    return null;
  }, [initialData]);

  useEffect(() => {
    let ignore = false;
    const hydrate = async () => {
      try {
        setLoading(true);
        if (normalized) {
          if (!ignore) {
            setEducation(normalized.educationData || []);
            setResponsibilities(normalized.responsibilitiesData || []);
          }
        } else {
          // Fetch from API directly if not provided
          const res = await fetch("/api/edu", { cache: "no-store" });
          if (!res.ok) throw new Error("Failed to fetch education data");
          const arr = (await res.json()) as DocShape[];
          const doc = arr?.[0];
          if (!ignore) {
            setEducation(doc?.educationData || []);
            setResponsibilities(doc?.responsibilitiesData || []);
          }
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message ?? "Failed to load education");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    hydrate();
    return () => {
      ignore = true;
    };
  }, [normalized]);

  const updateField = (
    index: number,
    field: keyof EducationItem,
    value: string
  ) => {
    setEducation((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value } as EducationItem;
      return next;
    });
  };

  const addEntry = () => {
    setEducation((prev) => [
      ...prev,
      { title: "", institution: "", score: "", duration: "" },
    ]);
  };

  const removeEntry = (index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid = () =>
    education.every((e) => e.title && e.institution && e.duration);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      if (!isValid()) {
        setError("Please fill title, institution, and duration for all entries");
        setSaving(false);
        return;
      }
      const res = await fetch("/api/edu/edit-edu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educationData: education,
          responsibilitiesData: responsibilities || [],
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to update education");
      }
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? "Failed to update education");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h4 className="text-lg font-mono">Education entries</h4>
        <Button onClick={addEntry} className="bg-orange-500 hover:bg-orange-600">
          + Add entry
        </Button>
      </div>

      {education.length === 0 && (
        <div className="text-sm text-slate-400">No entries yet.</div>
      )}

      <div className="space-y-3">
        {education.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Title</label>
                <Input
                  value={item.title}
                  onChange={(e) => updateField(idx, "title", e.target.value)}
                  placeholder="B.Tech (ECE)"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Institution
                </label>
                <Input
                  value={item.institution}
                  onChange={(e) =>
                    updateField(idx, "institution", e.target.value)
                  }
                  placeholder="ABC University"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Score</label>
                <Input
                  value={item.score}
                  onChange={(e) => updateField(idx, "score", e.target.value)}
                  placeholder="CGPA: 7.3 or 94%"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Duration
                </label>
                <Input
                  value={item.duration}
                  onChange={(e) => updateField(idx, "duration", e.target.value)}
                  placeholder="Sept 2022 - June 2026"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={() => removeEntry(idx)}
                className="text-red-300 hover:text-red-200"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
