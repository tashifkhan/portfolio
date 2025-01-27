export interface GitHubStats {
   topLanguages: { name: string; percentage: number }[]
   totalCommits: number
   longestStreak: number
}

export interface LeetCodeStats {
   status: string
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
}
