// MyDashboardPage.tsx
import { useState } from "react";
import { ChartWidget } from "../components/bi-ui-kit/ChartWidget";
import { DashboardGrid } from "../components/bi-ui-kit/DashboardGrid";
import { TimePeriodSelector } from "../components/filters/TimePeriodSelector";
import { useVisualizationData } from "../hooks/data-adapters/useVisualizationData";
import type { ChartWidgetProps } from "../components/bi-ui-kit/ChartWidget";

export const MyDashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("LAST_7_DAYS");

  const salesQuery = useVisualizationData({ metricId: "sales", timePeriod });
  const usersQuery = useVisualizationData({ metricId: "users", timePeriod });

  // 12 chart widgets: 6 for sales, 6 for users, using all chart types and some repeated with different titles
  const chartConfigs = [
    {
      key: "sales-col",
      title: "Sales (Column)",
      query: salesQuery,
      dataKey: "sales",
      variant: "column",
    },
    {
      key: "users-col",
      title: "Users (Column)",
      query: usersQuery,
      dataKey: "users",
      variant: "column",
    },
    {
      key: "sales-bar",
      title: "Sales (Bar)",
      query: salesQuery,
      dataKey: "sales",
      variant: "bar",
    },
    {
      key: "users-bar",
      title: "Users (Bar)",
      query: usersQuery,
      dataKey: "users",
      variant: "bar",
    },
    {
      key: "sales-pie",
      title: "Sales (Pie)",
      query: salesQuery,
      dataKey: "sales",
      variant: "pie",
    },
    {
      key: "users-pie",
      title: "Users (Pie)",
      query: usersQuery,
      dataKey: "users",
      variant: "pie",
    },
    {
      key: "sales-line",
      title: "Sales (Line)",
      query: salesQuery,
      dataKey: "sales",
      variant: "line",
    },
    {
      key: "users-line",
      title: "Users (Line)",
      query: usersQuery,
      dataKey: "users",
      variant: "line",
    },
    {
      key: "sales-col2",
      title: "Sales (Column 2)",
      query: salesQuery,
      dataKey: "sales",
      variant: "column",
    },
    {
      key: "users-col2",
      title: "Users (Column 2)",
      query: usersQuery,
      dataKey: "users",
      variant: "column",
    },
    {
      key: "sales-bar2",
      title: "Sales (Bar 2)",
      query: salesQuery,
      dataKey: "sales",
      variant: "bar",
    },
    {
      key: "users-bar2",
      title: "Users (Bar 2)",
      query: usersQuery,
      dataKey: "users",
      variant: "bar",
    },
    {
      key: "group-bar",
      title: "Sales vs Users (Group Bar)",
      query: salesQuery,
      dataKey: "sales",
      variant: "group-bar",
      groupData: {
        sales: Array.isArray(salesQuery.data) ? salesQuery.data : [],
        users: Array.isArray(usersQuery.data) ? usersQuery.data : [],
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>BI Dashboard POC (Highcharts)</h1>
      <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
      <DashboardGrid>
        {chartConfigs.map((cfg) => (
          <ChartWidget
            key={cfg.key}
            title={cfg.title}
            isLoading={!!cfg.query.isLoading || !!(cfg.groupData && usersQuery.isLoading)}
            isError={!!cfg.query.error || !!(cfg.groupData && usersQuery.error)}
            data={Array.isArray(cfg.query.data) ? cfg.query.data : []}
            dataKey={cfg.dataKey}
            variant={cfg.variant as ChartWidgetProps["variant"]}
            groupData={cfg.groupData}
          />
        ))}
      </DashboardGrid>
    </div>
  );
};
