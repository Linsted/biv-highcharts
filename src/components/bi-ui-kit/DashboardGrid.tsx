// DashboardGrid.tsx
// Stub for dashboard layout using Flexbox
import React from "react";

interface DashboardGridProps {
  children: React.ReactNode[];
}

export const DashboardGrid = ({ children }: DashboardGridProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {children.map((child, idx) => (
        <div
          key={idx}
          style={{
            flex: "1 1 45%",
            minWidth: 350,
            minHeight: 320,
            boxSizing: "border-box",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
