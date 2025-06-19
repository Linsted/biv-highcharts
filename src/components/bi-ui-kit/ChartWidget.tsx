import { Loader, Text } from "@mantine/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as drilldownModule from "highcharts/modules/drilldown";
import { useEffect, useMemo } from "react";

// Initialize drilldown module
if (
  typeof Highcharts === "object" &&
  typeof drilldownModule.default === "function"
) {
  drilldownModule.default(Highcharts);
}

export interface ChartWidgetProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  data: any[];
  dataKey: string; // e.g., 'sales' or 'users'
  variant?: "column" | "bar" | "pie" | "line" | "group-bar";
  groupData?: { users?: any[]; sales?: any[] };
  drilldown?: {
    series: any[];
    drilldownData: any[];
  };
}

export const ChartWidget = ({
  title,
  isLoading,
  isError,
  data,
  dataKey,
  variant = "column",
  groupData,
  drilldown,
}: ChartWidgetProps) => {
  useEffect(() => {
    if (
      typeof Highcharts === "object" &&
      typeof drilldownModule.default === "function"
    ) {
      drilldownModule.default(Highcharts);
    }
  }, []);

  const chartOptions = useMemo(() => {
    if (drilldown) {
      return {
        chart: { type: variant },
        title: { text: null },
        xAxis: { categories: data?.map((item) => item.name) || [] },
        yAxis: { title: { text: "Value" } },
        series: drilldown.series,
        drilldown: { series: drilldown.drilldownData },
        credits: { enabled: false },
      };
    }
    if (variant === "pie") {
      return {
        chart: { type: "pie" },
        title: { text: null },
        series: [
          {
            name: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
            data:
              data?.map((item) => ({
                name: item.name,
                y: item[dataKey],
                drilldown: item.drilldown,
              })) || [],
          },
        ],
        credits: { enabled: false },
      };
    }
    if (variant === "group-bar" && groupData) {
      return {
        chart: { type: "bar" },
        title: { text: null },
        xAxis: { categories: data?.map((item) => item.name) || [] },
        yAxis: { title: { text: "Value" } },
        series: [
          {
            name: "Sales",
            data: groupData.sales?.map((item) => item.sales) || [],
          },
          {
            name: "Users",
            data: groupData.users?.map((item) => item.users) || [],
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
  }, [data, dataKey, variant, groupData, drilldown]);

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
