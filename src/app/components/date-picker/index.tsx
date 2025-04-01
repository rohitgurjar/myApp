import { useState, useEffect } from "react";
import dayjs from "dayjs";

interface DateDropdownProps {
  label?: string;
  startYear?: number;
  endYear?: number;
  onChange: (date: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DateDropdown: React.FC<DateDropdownProps> = ({
  label = "Select Date",
  startYear = 1950,
  endYear = new Date().getFullYear(),
  onChange,
  selectedDate,
  setSelectedDate,
}) => {
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  // Set initial values when selectedDate is provided
  useEffect(() => {
    if (selectedDate) {
      const parsedDate = dayjs(selectedDate);
      if (parsedDate.isValid()) {
        setDay(parsedDate.date());
        setMonth(parsedDate.month() + 1);
        setYear(parsedDate.year());
      }
    }
  }, [selectedDate]); // Run only when selectedDate changes

  // Update selected date when all values are set
  useEffect(() => {
    if (day !== null && month !== null && year !== null) {
      const formattedDate = dayjs(`${year}-${month}-${day}`).format(
        "YYYY-MM-DD"
      );
      setSelectedDate(formattedDate);
      onChange(formattedDate);
    }
  }, [day, month, year]); // Now updates correctly when values change

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex space-x-2">
        {/* Day Dropdown */}
        <select
          value={day ?? ""}
          onChange={(e) => setDay(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-24"
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        <select
          value={month ?? ""}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-28"
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {dayjs().month(m - 1).format("MMMM")}
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={year ?? ""}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-28"
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateDropdown;
