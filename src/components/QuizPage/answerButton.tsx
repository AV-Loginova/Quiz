import React, { useEffect, useState } from "react";

type Props = {
  text: string;
  onclick: (e: React.SyntheticEvent) => void;
  correct: string;
  isDisabled: boolean;
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
};

function AnswerButton({
  text,
  onclick,
  correct,
  isDisabled,
  isClicked,
  setIsClicked,
}: Props) {
  const [buttonStyle, setButtonStyle] = useState<string>(
    "bg-[#ffdd5f] hover:bg-[#ffe484] text-black"
  );

  useEffect(() => {
    if (isClicked) {
      setButtonStyle("bg-[#ffdd5f] hover:bg-[#ffe484] text-black");
      setIsClicked(false);
    }
  }, [isClicked]);

  const handleClick = (e: React.SyntheticEvent) => {
    onclick(e);
    if (text === correct) {
      setButtonStyle("bg-[#4eb24e] hover:bg-[#4eb24e] text-white");
    } else {
      setButtonStyle("bg-[#f7583e] hover:bg-[#f7583e] text-white");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-[100%] text-center p-3 rounded-[5px] transition-all ${buttonStyle} text-s`}
    >
      {text}
    </button>
  );
}

export default AnswerButton;
