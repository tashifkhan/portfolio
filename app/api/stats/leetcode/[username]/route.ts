import { NextResponse } from "next/server"
import type { LeetCodeStats, LeetCodeGraphQLResponse } from "@/types/stats"

const GRAPHQL_QUERY = `
query getUserProfile($username: String!) {
   allQuestionsCount {
      difficulty
      count
   }
   matchedUser(username: $username) {
      contributions {
         points
      }
      profile {
         reputation
         ranking
      }
      submissionCalendar
      submitStats {
         acSubmissionNum {
            difficulty
            count
            submissions
         }
         totalSubmissionNum {
            difficulty
            count
            submissions
         }
      }
   }
}`

function calculateAcceptanceRate(
   totalAccepted: number,
   totalSubmissions: number
): number {
   if (totalSubmissions === 0) return 0
   return Number(((totalAccepted / totalSubmissions) * 100).toFixed(2))
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
   const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Referer": `https://leetcode.com/${username}/`
      },
      body: JSON.stringify({
         query: GRAPHQL_QUERY,
         variables: { username }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
   })

   if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.statusText}`)
   }

   const data: LeetCodeGraphQLResponse = await response.json()
   
   if ("errors" in data) {
      throw new Error("User does not exist")
   }

   const { matchedUser, allQuestionsCount } = data.data
   const { submitStats } = matchedUser
   const actualSubmissions = submitStats.acSubmissionNum
   const totalSubmissions = submitStats.totalSubmissionNum

   const acceptanceRate = calculateAcceptanceRate(
      actualSubmissions[0].submissions,
      totalSubmissions[0].submissions
   )

   return {
      status: "success",
      message: "retrieved",
      totalSolved: actualSubmissions[0].count,
      totalQuestions: allQuestionsCount[0].count,
      easySolved: actualSubmissions[1].count,
      totalEasy: allQuestionsCount[1].count,
      mediumSolved: actualSubmissions[2].count,
      totalMedium: allQuestionsCount[2].count,
      hardSolved: actualSubmissions[3].count,
      totalHard: allQuestionsCount[3].count,
      acceptanceRate,
      ranking: matchedUser.profile.ranking,
      contributionPoints: matchedUser.contributions.points,
      reputation: matchedUser.profile.reputation,
      submissionCalendar: JSON.parse(matchedUser.submissionCalendar)
   }
}

export async function GET(
   request: Request,
   { params }: { params: Promise<{ username: string }> }  
) {
   try {
      const parameters = await params
      const stats = await fetchLeetCodeStats(parameters.username)
      return NextResponse.json(stats)
   } catch (error) {
      return NextResponse.json(
         {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch LeetCode stats",
            totalSolved: 0,
            totalQuestions: 0,
            easySolved: 0,
            totalEasy: 0,
            mediumSolved: 0,
            totalMedium: 0,
            hardSolved: 0,
            totalHard: 0,
            acceptanceRate: 0,
            ranking: 0,
            contributionPoints: 0,
            reputation: 0,
            submissionCalendar: {}
         },
         { status: 500 }
      )
   }
}
