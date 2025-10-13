import React from "react";

type HomeProps = {
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Home({ setHomePage }: HomeProps) {
  const gettingStarted = () => setHomePage(false);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold">Average Birthday Calculator</h1>
      <h2 className="text-xl mt-3">See what the average of all your friends birthday is</h2>
      <button onClick={gettingStarted} className="py-2 px-4 mt-8">
        Get Started
      </button>
    </div>
  );
}
