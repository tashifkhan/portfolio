import { NextResponse } from "next/server"
import { getContributionGraphs } from "@/utils/github"
import { fetchLanguageStats } from "@/utils/languageStats"
import { calculateTotalCommits, calculateLongestStreak } from "@/utils/githubStats"
import { calculateCurrentStreak } from "@/utils/githubStats"

export async function GET(
   request: Request,
   { params }: { params: Promise<{ username: string }> }
): Promise<NextResponse> {
   try {
      const parameters = await params
      const username = parameters.username
      const url = new URL(request.url)
      const excludedLanguages = url.searchParams.get("exclude")?.split(",") || []
      
      if (!username) {
         return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
         )
      }
      
      const [contributionData, languageStats] = await Promise.all([
         getContributionGraphs(username),
         fetchLanguageStats(username, excludedLanguages)
      ])

      if (!contributionData || !languageStats) {
         throw new Error("Invalid GitHub stats response")
      }

      const stats = {
         topLanguages: languageStats,
         totalCommits: calculateTotalCommits(contributionData),
         longestStreak: calculateLongestStreak(contributionData),
         currentStreak: calculateCurrentStreak(contributionData)
      }

      return NextResponse.json(stats)
   } catch (err) {
      return NextResponse.json(
         { error: err instanceof Error ? err.message : "Failed to fetch GitHub stats" },
         { status: 500 }
      )
   }
}