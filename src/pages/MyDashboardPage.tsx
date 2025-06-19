// MyDashboardPage.tsx
import { useState } from "react";
import type { ChartWidgetProps } from "../components/bi-ui-kit/ChartWidget";
import { ChartWidget } from "../components/bi-ui-kit/ChartWidget";
import { DashboardGrid } from "../components/bi-ui-kit/DashboardGrid";
import { TimePeriodSelector } from "../components/filters/TimePeriodSelector";
import { useVisualizationData } from "../hooks/data-adapters/useVisualizationData";

export const MyDashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("LAST_30_DAYS");

  const salesQuery = useVisualizationData({ metricId: "sales", timePeriod });
  const usersQuery = useVisualizationData({ metricId: "users", timePeriod });

  // Drilldown example data
  const drilldownSeries = [
    {
      name: "Sales",
      colorByPoint: true,
      data: [
        { name: "Day 1", y: 5000, drilldown: "day-1" },
        { name: "Day 2", y: 7000, drilldown: "day-2" },
        { name: "Day 3", y: 6000, drilldown: "day-3" },
      ],
      type: "column",
    },
  ];
  const drilldownData = [
    {
      id: "day-1",
      name: "Day 1 Details",
      data: [
        ["Morning", 2000],
        ["Afternoon", 1500],
        ["Evening", 1500],
      ],
      type: "column",
    },
    {
      id: "day-2",
      name: "Day 2 Details",
      data: [
        ["Morning", 3000],
        ["Afternoon", 2000],
        ["Evening", 2000],
      ],
      type: "column",
    },
    {
      id: "day-3",
      name: "Day 3 Details",
      data: [
        ["Morning", 2500],
        ["Afternoon", 2000],
        ["Evening", 1500],
      ],
      type: "column",
    },
  ];

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
    {
      key: "drilldown-sales",
      title: "Sales (Drilldown)",
      query: salesQuery,
      dataKey: "sales",
      variant: "column",
      drilldown: { series: drilldownSeries, drilldownData },
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
            isLoading={
              !!cfg.query.isLoading || !!(cfg.groupData && usersQuery.isLoading)
            }
            isError={!!cfg.query.error || !!(cfg.groupData && usersQuery.error)}
            data={Array.isArray(cfg.query.data) ? cfg.query.data : []}
            dataKey={cfg.dataKey}
            variant={cfg.variant as ChartWidgetProps["variant"]}
            groupData={cfg.groupData}
            drilldown={cfg.drilldown}
          />
        ))}
      </DashboardGrid>
    </div>
  );
};
