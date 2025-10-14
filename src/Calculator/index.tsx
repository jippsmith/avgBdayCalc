import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DaySelector, MonthSelector } from "./BirthdaySelector";
import ListedNames from "./ListedNames";
import { PlusIcon } from "lucide-react";
import BirthdayStore from "../BirthdayStore";

const placeHolder = (word: string): React.ReactNode => <span className="font-normal opacity-50">{word}</span>;

type AddFriendProps = {
  name: string;
  month: string;
  day: number;
  resetFriend: () => void;
};

function AddFriendButton({ name, month, day, resetFriend }: AddFriendProps) {
  const addFriendDisabled = !name || !month || !day;
  function addFriend() {
    BirthdayStore.addBirthday({ name, month, day });
    resetFriend();
  }

  return (
    <div className="w-sm flex items-center justify-between">
      <div>
        <div className="h-7 font-bold text-xl">{name || placeHolder("Name")}</div>
        <div className="">
          {month || placeHolder("Month")} {day === 0 ? placeHolder("day") : day}
        </div>
      </div>
      <button className="p-2 px-5 flex items-center justify-center text-md font-bold" disabled={addFriendDisabled} onClick={addFriend}>
        Add friend <PlusIcon className="size-5 text-green-300 ml-1" />
      </button>
    </div>
  );
}

export default function Calculator() {
  const [name, setName] = useState<string>("");
  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event?.target?.value);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<number>(0);

  const resetFriend = () => {
    setName("");
    setMonth("");
    setDay(0);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-30">
      <div className="flex flex-col gap-4">
        <span className="font-extrabold -mb-2 tracking-widest">Name</span>
        <input placeholder="Enter name here..." maxLength={19} value={name} onChange={updateName} className="w-sm" />
        <span className="font-extrabold -mb-2 tracking-widest">Month</span>
        <MonthSelector {...{ month, setMonth }} />
        <span className="font-extrabold -mb-2 tracking-widest">Day</span>
        <DaySelector {...{ month, setDay, day }} />
        <AddFriendButton {...{ month, day, name, resetFriend }} />
      </div>
      <ListedNames />
    </div>
  );
}
