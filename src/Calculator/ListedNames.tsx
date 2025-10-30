import { Trash2Icon } from "lucide-react";
import BirthdayStore from "../BirthdayStore";
import { observer } from "mobx-react-lite";

type BirthdayDetailsProps = {
  name: string;
  month: string;
  day: number;
  index: number;
};

function BirthdayDetails({ name, month, day, index }: BirthdayDetailsProps) {
  const deleteBirthday = () => BirthdayStore.deleteBirthday(index);
  return (
    <div className="w-72 flex justify-between items-center">
      <div>
        <div className="font-bold text-xl">{name}</div>
        <div>
          {month} {day}
        </div>
      </div>
      <div
        className="h-9 flex items-center justify-between gap-3 text-sm hover:text-red-500 transition-colors duration-500 cursor-pointer"
        onClick={deleteBirthday}
      >
        <Trash2Icon className="size-6" />
      </div>
    </div>
  );
}

function BirthdayPlaceholder() {
  return (
    <div className="w-72 flex justify-between items-center opacity-70">
      <div>
        <div className="font-bold text-xl">Enter your friend's names and birthday</div>
        <div className="">And you can add yours too ;)</div>
      </div>
    </div>
  );
}

const ListedNames: React.FC = observer(() => {
  const { birthdays, calculateAverage } = BirthdayStore;
  const hasBirthdays = birthdays?.length > 0;
  const listedBirthdays = hasBirthdays ? birthdays?.map((b, i) => <BirthdayDetails {...{ ...b, index: i }} key={i} />) : null;
  const placeholder = hasBirthdays ? null : <BirthdayPlaceholder />;

  return (
    <div className="">
      <div className="mb-8 font-extrabold -mb-2 tracking-widest ">Birthdays to be calculated</div>
      <div className="flex flex-col gap-6">{listedBirthdays}</div>
      {placeholder}
      <button
        className="mt-8 w-72 p-2 px-5 flex items-center justify-center text-md font-bold"
        disabled={!hasBirthdays}
        onClick={calculateAverage}
      >
        Calculate Average
      </button>
    </div>
  );
});

export default ListedNames;
