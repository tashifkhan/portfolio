import { ContributionResponse } from './github';

export const calculateTotalCommits = (
  contributionData: Record<number, ContributionResponse>
): number => {
  let totalCommits = 0;

  Object.values(contributionData).forEach((yearData) => {
    const weeks = yearData.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        totalCommits += day.contributionCount;
      });
    });
  });

  return totalCommits;
};

export const calculateCurrentStreak = (
  contributionData: Record<number, ContributionResponse>
): number => {
  let allDays: { date: string; contributionCount: number }[] = [];

  // Collect all contribution days from all years
  Object.values(contributionData).forEach((yearData) => {
    const weeks = yearData.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    weeks.forEach((week) => {
      allDays = [...allDays, ...week.contributionDays];
    });
  });

  // Sort days by date (most recent first)
  allDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (allDays.length === 0) return 0;

  // Get today's date and the most recent data date
  const today = new Date();
  const mostRecentDataDate = new Date(allDays[0].date);
  
  // If the most recent data is more than 2 days old, no current streak
  const daysDiff = Math.floor((today.getTime() - mostRecentDataDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 2) return 0;

  let currentStreak = 0;
  let lastContributionDate: Date | null = null;

  // Calculate current streak from most recent day backwards
  for (let i = 0; i < allDays.length; i++) {
    const day = allDays[i];
    const dayDate = new Date(day.date);
    
    if (day.contributionCount > 0) {
      // If this is the first contribution or consecutive with the last one
      if (lastContributionDate === null || 
          Math.floor((lastContributionDate.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24)) <= 1) {
        currentStreak++;
        lastContributionDate = dayDate;
      } else {
        // Gap found, current streak ends
        break;
      }
    } else {
      // No contribution on this day
      if (lastContributionDate !== null) {
        // Check if this gap is acceptable (e.g., only 1 day gap)
        const gapDays = Math.floor((lastContributionDate.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
        if (gapDays > 1) {
          // Gap is too long, streak ends
          break;
        }
      }
    }
  }

  return currentStreak;
};

export const calculateLongestStreak = (
  contributionData: Record<number, ContributionResponse>
): number => {
  let currentStreak = 0;
  let longestStreak = 0;
  let allDays: { date: string; contributionCount: number }[] = [];

  // Collect all contribution days from all years
  Object.values(contributionData).forEach((yearData) => {
    const weeks = yearData.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    weeks.forEach((week) => {
      allDays = [...allDays, ...week.contributionDays];
    });
  });

  // Sort days by date
  allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate longest streak
  allDays.forEach((day) => {
    if (day.contributionCount > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return longestStreak;
};