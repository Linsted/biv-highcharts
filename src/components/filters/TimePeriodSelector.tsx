// TimePeriodSelector.tsx
import { Select } from "@mantine/core";

interface TimePeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: "LAST_7_DAYS", label: "Last 7 Days" },
  { value: "LAST_30_DAYS", label: "Last 30 Days" },
  { value: "LAST_3_DAYS", label: "Last 3 Days" },
];

export const TimePeriodSelector = ({
  value,
  onChange,
}: TimePeriodSelectorProps) => (
  <Select
    label="Time Period"
    data={options}
    value={value}
    onChange={(val) => {
      if (val) onChange(val);
    }}
  />
);
