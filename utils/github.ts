interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionResponse {
  data?: {
    user: {
      createdAt: string;
      contributionsCollection: {
        contributionYears: number[];
        contributionCalendar: {
          weeks: {
            contributionDays: ContributionDay[];
          }[];
        };
      };
    };
  };
  errors?: Array<{ message: string; type: string }>;
}

const buildContributionGraphQuery = (user: string, year: number): string => {
  const start = `${year}-01-01T00:00:00Z`;
  const end = `${year}-12-31T23:59:59Z`;
  return `query {
    user(login: "${user}") {
      createdAt
      contributionsCollection(from: "${start}", to: "${end}") {
        contributionYears
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;
};

const executeGraphQLQuery = async (query: string, token?: string): Promise<ContributionResponse> => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token || process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  
  return await response.json();
};

const executeContributionGraphRequests = async (
  user: string,
  years: number[]
): Promise<Record<number, ContributionResponse>> => {
  const responses: Record<number, ContributionResponse> = {};
  
  // Execute requests in parallel
  const requests = years.map(async (year) => {
    try {
      const query = buildContributionGraphQuery(user, year);
      let response = await executeGraphQLQuery(query);
      
      // Retry once if the first attempt fails
      if (!response.data || response.errors) {
        console.error(`First attempt failed for ${user}'s ${year} contributions:`, 
          response.errors?.[0]?.message || 'Unknown error');
        
        // Retry with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = await executeGraphQLQuery(query);
        
        if (!response.data || response.errors) {
          console.error(`Second attempt failed for ${user}'s ${year} contributions:`,
            response.errors?.[0]?.message || 'Unknown error');
          return;
        }
      }
      
      responses[year] = response;
    } catch (error) {
      console.error(`Error fetching ${year} contributions:`, error);
    }
  });
  
  await Promise.all(requests);
  return responses;
};

export const getContributionGraphs = async (
  user: string,
  startingYear?: number
): Promise<Record<number, ContributionResponse>> => {
  const currentYear = new Date().getFullYear();
  
  // Get current year's contributions first
  const responses = await executeContributionGraphRequests(user, [currentYear]);
  
  const userCreatedDateString = responses[currentYear]?.data?.user?.createdAt;
  if (!userCreatedDateString) {
    throw new Error("Failed to retrieve contributions. This is likely a GitHub API issue.");
  }
  
  const userCreatedYear = parseInt(userCreatedDateString.split('-')[0]);
  const minimumYear = Math.max(startingYear || userCreatedYear, 2005);
  
  // Get all years from minimum to current
  const years = Array.from(
    { length: currentYear - minimumYear + 1 },
    (_, i) => minimumYear + i
  );
  
  return await executeContributionGraphRequests(user, years);
};