import BirthdayStore from "./BirthdayStore";
import { observer } from "mobx-react-lite";

type Birthday = { month: string; day: number };

const Result = observer(() => {
  const { reset, goToHomePage, averageBirthday } = BirthdayStore || {};
  const { month, day }: Birthday = averageBirthday || { month: "", day: 0 };

  const averageBirthdayText = !!month && !!day ? `${month} ${day}` : "Calculating...";
  const playAgain = () => {
    goToHomePage();
    reset();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div>The average birthday is...</div>
      <div className="py-5 font-bold text-2xl">{averageBirthdayText}</div>
      <div>Happy happy birthday!</div>
      <button className="mt-8 w-72 p-2 px-5 flex items-center justify-center text-md font-bold" onClick={playAgain}>
        Play again
      </button>
    </div>
  );
});

export default Result;
