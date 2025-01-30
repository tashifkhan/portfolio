import { NextRequest, NextResponse } from "next/server"
import { getContributionGraphs } from "@/utils/github"
import { fetchLanguageStats } from "@/utils/languageStats"
import { calculateTotalCommits, calculateLongestStreak } from "@/utils/githubStats"

export async function GET(
   request: NextRequest,
   { params }: { params: { username: string | null | undefined} }
): Promise<NextResponse> {
   try {
      if (!params?.username) {
         return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
         )
      }

      const username = params.username

      const [contributionData, languageStats] = await Promise.all([
         getContributionGraphs(username),
         fetchLanguageStats(username)
      ])

      if (!contributionData || !languageStats) {
         throw new Error("Invalid GitHub stats response")
      }

      const stats = {
         topLanguages: languageStats,
         totalCommits: calculateTotalCommits(contributionData),
         longestStreak: calculateLongestStreak(contributionData)
      }

      return NextResponse.json(stats)
   } catch (error) {
      return NextResponse.json(
         { error: error instanceof Error ? error.message : "Failed to fetch GitHub stats" },
         { status: 500 }
      )
   }
}
