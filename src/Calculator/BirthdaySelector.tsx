import cn from "../utils/cn";

interface AmountOfDaysInMonths {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

const amountOfDaysInMonths: AmountOfDaysInMonths = {
  January: 31,
  February: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};

const months = Object.keys(amountOfDaysInMonths) as (keyof AmountOfDaysInMonths)[];
type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type MonthProps = {
  month: string;
  selectedMonth: string;
  setMonth: Setter<string>;
};

function Month({ month, selectedMonth, setMonth }: MonthProps) {
  const selectedStyle = selectedMonth === month ? "font-bold text-lg text-blue-200" : "";
  const selectMonth = () => setMonth(month);
  return (
    <button className={cn("h-10", selectedStyle)} onClick={selectMonth}>
      {month}
    </button>
  );
}
type MonthSelectorProps = {
  month: string;
  setMonth: Setter<string>;
};

export function MonthSelector({ month, setMonth }: MonthSelectorProps) {
  const monthsButtons = months.map(m => <Month month={m} selectedMonth={month} setMonth={setMonth} key={m} />);
  return <div className="grid grid-cols-3 gap-3 items-stretch w-sm"> {monthsButtons}</div>;
}

type DayProps = {
  day: number;
  selectedDay: number;
  setDay: Setter<number>;
};

function Day({ selectedDay, day, setDay }: DayProps) {
  const selectedStyle = selectedDay === day ? "font-bold text-lg text-blue-200" : "";
  const selectDay = () => setDay(day);
  return (
    <button className={cn("h-10", selectedStyle)} onClick={selectDay}>
      {day}
    </button>
  );
}

type DaySelectorProps = {
  month: string;
  day: number;
  setDay: Setter<number>;
};
export function DaySelector({ day, month, setDay }: DaySelectorProps) {
  const numberOfDays = amountOfDaysInMonths[month as keyof AmountOfDaysInMonths] || 31;
  const days = new Array(numberOfDays).fill(null).map((_, i) => <Day day={i + 1} setDay={setDay} selectedDay={day} key={`day-${i}`} />);
  return (
    <div className="w-sm">
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  );
}
