export interface VisualizationConfig {
  metricId: string;
  timePeriod: string; // e.g., 'LAST_7_DAYS', 'LAST_30_DAYS'
}

const salesData = [
  { name: "Day 1", sales: 4000 },
  { name: "Day 2", sales: 3000 },
  { name: "Day 3", sales: 5000 },
  { name: "Day 4", sales: 4500 },
  { name: "Day 5", sales: 6000 },
  { name: "Day 6", sales: 5500 },
  { name: "Day 7", sales: 7000 },
];

const usersData = [
  { name: "Day 1", users: 120 },
  { name: "Day 2", users: 150 },
  { name: "Day 3", users: 110 },
  { name: "Day 4", users: 180 },
  { name: "Day 5", users: 210 },
  { name: "Day 6", users: 190 },
  { name: "Day 7", users: 230 },
];

export const fetchMockData = async (
  config: VisualizationConfig
): Promise<any[]> => {
  console.log("Fetching mock data with config:", config);
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = config.metricId === "sales" ? salesData : usersData;

  if (config.timePeriod === "LAST_3_DAYS") {
    return data.slice(-3);
  }
  return data;
};
