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
  let currentStreak = 0;
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

  // Calculate current streak (from the most recent day backwards)
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
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