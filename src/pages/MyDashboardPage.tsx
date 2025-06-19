// MyDashboardPage.tsx
import { useState } from "react";
import { ChartWidget } from "../components/bi-ui-kit/ChartWidget";
import { DashboardGrid } from "../components/bi-ui-kit/DashboardGrid";
import { TimePeriodSelector } from "../components/filters/TimePeriodSelector";
import { useVisualizationData } from "../hooks/data-adapters/useVisualizationData";

export const MyDashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("LAST_7_DAYS");

  // Example: two charts, one for sales, one for users
  const salesQuery = useVisualizationData({ metricId: "sales", timePeriod });
  const usersQuery = useVisualizationData({ metricId: "users", timePeriod });

  const layout = [
    { i: "sales", x: 0, y: 0, w: 6, h: 1 },
    { i: "users", x: 6, y: 0, w: 6, h: 1 },
    { i: "sales-bar", x: 0, y: 1, w: 6, h: 1 },
    { i: "users-pie", x: 6, y: 1, w: 6, h: 1 },
    { i: "sales-line", x: 0, y: 2, w: 12, h: 1 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>BI Dashboard POC (Highcharts)</h1>
      <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
      <DashboardGrid layout={layout}>
        {[
          <ChartWidget
            key="sales"
            title="Sales (Column)"
            isLoading={salesQuery.isLoading}
            isError={!!salesQuery.error}
            data={Array.isArray(salesQuery.data) ? salesQuery.data : []}
            dataKey="sales"
            variant="column"
          />,
          <ChartWidget
            key="users"
            title="Users (Column)"
            isLoading={usersQuery.isLoading}
            isError={!!usersQuery.error}
            data={Array.isArray(usersQuery.data) ? usersQuery.data : []}
            dataKey="users"
            variant="column"
          />,
          <ChartWidget
            key="sales-bar"
            title="Sales (Bar)"
            isLoading={salesQuery.isLoading}
            isError={!!salesQuery.error}
            data={Array.isArray(salesQuery.data) ? salesQuery.data : []}
            dataKey="sales"
            variant="bar"
          />,
          <ChartWidget
            key="users-pie"
            title="Users (Pie)"
            isLoading={usersQuery.isLoading}
            isError={!!usersQuery.error}
            data={Array.isArray(usersQuery.data) ? usersQuery.data : []}
            dataKey="users"
            variant="pie"
          />,
          <ChartWidget
            key="sales-line"
            title="Sales (Line)"
            isLoading={salesQuery.isLoading}
            isError={!!salesQuery.error}
            data={Array.isArray(salesQuery.data) ? salesQuery.data : []}
            dataKey="sales"
            variant="line"
          />,
        ]}
      </DashboardGrid>
    </div>
  );
};
