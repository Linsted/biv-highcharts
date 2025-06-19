import { Loader, Text } from "@mantine/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";

export interface ChartWidgetProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  data: any[];
  dataKey: string; // e.g., 'sales' or 'users'
  variant?: "column" | "bar" | "pie" | "line"; // Add 'line' variant
}

export const ChartWidget = ({
  title,
  isLoading,
  isError,
  data,
  dataKey,
  variant = "column", // Default to column
}: ChartWidgetProps) => {
  const chartOptions = useMemo(() => {
    if (variant === "pie") {
      return {
        chart: { type: "pie" },
        title: { text: null },
        series: [
          {
            name: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
            data:
              data?.map((item) => ({ name: item.name, y: item[dataKey] })) ||
              [],
          },
        ],
        credits: { enabled: false },
      };
    }
    // bar, column, or line
    return {
      chart: { type: variant },
      title: { text: null },
      xAxis: { categories: data?.map((item) => item.name) || [] },
      yAxis: { title: { text: "Value" } },
      series: [
        {
          name: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
          data: data?.map((item) => item[dataKey]) || [],
        },
      ],
      credits: { enabled: false },
    };
  }, [data, dataKey, variant]);

  if (isLoading) {
    return (
      <div>
        <Loader /> <Text>Loading "{title}"...</Text>
      </div>
    );
  }
  if (isError) {
    return <Text color="red">Could not load data for "{title}".</Text>;
  }
  if (!data || data.length === 0) {
    return <Text>No data to display for "{title}".</Text>;
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3>{title}</h3>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
