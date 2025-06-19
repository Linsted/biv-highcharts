// TimePeriodSelector.tsx
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
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: 160,
    }}
  >
    <label
      htmlFor="time-period-select"
      style={{
        fontWeight: 500,
        fontSize: 14,
        marginBottom: 2,
      }}
    >
      Time Period
    </label>
    <select
      id="time-period-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "6px 24px 6px 8px",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid #ccc",
        minWidth: 140,
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
