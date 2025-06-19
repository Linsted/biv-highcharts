export interface VisualizationConfig {
  metricId: string;
  timePeriod: string; // e.g., 'LAST_7_DAYS', 'LAST_30_DAYS'
}

// Generate 30 days of mock data
type SalesDatum = { name: string; sales: number };
type UsersDatum = { name: string; users: number };

const salesData: SalesDatum[] = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  sales: 3000 + Math.round(Math.random() * 4000),
}));

const usersData: UsersDatum[] = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  users: 100 + Math.round(Math.random() * 150),
}));

export const fetchMockData = async (
  config: VisualizationConfig
): Promise<any[]> => {
  console.log("Fetching mock data with config:", config);
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = config.metricId === "sales" ? salesData : usersData;

  if (config.timePeriod === "LAST_3_DAYS") {
    return data.slice(-3);
  }
  if (config.timePeriod === "LAST_7_DAYS") {
    return data.slice(-7);
  }
  if (config.timePeriod === "LAST_30_DAYS") {
    return data;
  }
  return data;
};
