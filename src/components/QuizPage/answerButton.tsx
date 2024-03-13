import { useState } from "react";

type props = {
  text: string;
  onclick: any;
  correct: string;
  isDisabled: boolean;
  nextClicked: boolean;
};

function AnswerButton({
  text,
  onclick,
  correct,
  isDisabled,
  nextClicked,
}: props) {
  const [backChange, setBackChange] = useState("");

  function handleClick(e: React.SyntheticEvent) {
    onclick(e);
    console.log("Next clicked:", nextClicked);

    if (nextClicked === true) {
      setBackChange("bg-[#ffdd5f] hover:bg-[#ffe484] text-black");
    }
    if (text === correct) {
      setBackChange("bg-[#4eb24e] hover:bg-[#4eb24e] text-white");
    } else {
      setBackChange("bg-[#f7583e] hover:bg-[#f7583e] text-white");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-[100%] text-center bg-[#ffdd5f] p-3 rounded-[5px] hover:bg-[#ffe484] transition-all ${backChange}`}
    >
      {text}
    </button>
  );
}

export default AnswerButton;
