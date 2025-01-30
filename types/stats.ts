export interface GitHubStats {
   topLanguages: { name: string; percentage: number }[]
   totalCommits: number
   longestStreak: number
}

export interface LeetCodeStats {
   status: string
   message: string
   totalSolved: number
   totalQuestions: number
   easySolved: number
   totalEasy: number
   mediumSolved: number
   totalMedium: number
   hardSolved: number
   totalHard: number
   acceptanceRate: number
   ranking: number
   contributionPoints: number
   reputation: number
   submissionCalendar: Record<string, number>
}

interface QuestionCount {
   difficulty: string
   count: number
}

interface SubmissionCount extends QuestionCount {
   submissions: number
}

export interface LeetCodeGraphQLResponse {
   data: {
      allQuestionsCount: QuestionCount[]
      matchedUser: {
         contributions: {
            points: number
         }
         profile: {
            reputation: number
            ranking: number
         }
         submissionCalendar: string
         submitStats: {
            acSubmissionNum: SubmissionCount[]
            totalSubmissionNum: SubmissionCount[]
         }
      }
   }
}
