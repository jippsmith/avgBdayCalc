import { Trash2Icon } from "lucide-react";

type BirthdayDetailsProps = {
  name: string;
  birthday: string;
};

function BirthdayDetails({ name, birthday }: BirthdayDetailsProps) {
  return (
    <div className="w-72 flex justify-between items-center">
      <div>
        <div className="font-bold text-xl">{name}</div>
        <div> {birthday}</div>
      </div>
      <div className="h-9 flex items-center justify-between gap-3 text-sm hover:text-red-500 transition-colors duration-500 cursor-pointer">
        <Trash2Icon className="size-6" />
      </div>
    </div>
  );
}

export default function ListedNames() {
  return (
    <div className="flex flex-col gap-8">
      <BirthdayDetails name="Jessica" birthday="November 2" />
      <BirthdayDetails name="Allyson" birthday="August 23" />
      <button className="p-2 px-5 flex items-center justify-center text-md font-bold">Calculate Average</button>
    </div>
  );
}
