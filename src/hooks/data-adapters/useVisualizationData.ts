import { useQuery } from "@tanstack/react-query";
import { fetchMockData, type VisualizationConfig } from "./mock.adapter";

const fetcher = fetchMockData;

export const useVisualizationData = (config: VisualizationConfig) => {
  return useQuery({
    queryKey: ["visualizationData", config],
    queryFn: () => fetcher(config),
    keepPreviousData: true,
  });
};
