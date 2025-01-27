import jsyaml from "js-yaml";
import path from "path";
import fs from "fs";

const EXCLUDED_LANGUAGES = [
  "Jupyter Notebook",
  "HTML",
  "CSS",
  "Markdown",
  "JSON",
  "YAML",
  "XML"
];

interface LanguageData {
  name: string;
  percentage: number;
}

export const fetchLanguageStats = async (username: string): Promise<LanguageData[]> => {
  try {
    // Fetch user repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });
    const repos = await reposResponse.json();

    // Fetch language data for each repository
    const languagePromises = repos.map(async (repo: { languages_url: string }) => {
      const langResponse = await fetch(repo.languages_url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });
      return langResponse.json();
    });

    const repoLanguages = await Promise.all(languagePromises);

    // Aggregate language bytes across all repositories
    const languageTotals: Record<string, number> = {};
    repoLanguages.forEach((langs) => {
      Object.entries(langs).forEach(([lang, bytes]: [string, unknown]) => {
        // Skip excluded languages
        if (EXCLUDED_LANGUAGES.includes(lang)) return;
        languageTotals[lang] = (languageTotals[lang] || 0) + (bytes as number);
      });
    });

    // Calculate percentages
    const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);

    const languageStats = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Get top 5 languages

    return languageStats;
  } catch (error) {
    console.error('Error fetching language stats:', error);
    return [];
  }
};