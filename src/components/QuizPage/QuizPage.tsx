import { useEffect, useState } from "react";
import AnswerButton from "./answerButton";

type quizData = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: [string];
  question: {
    text: string;
  };
  tags: [string];
  type: string;
  difficulty: string;
  regions: [string];
  isNiche: boolean;
};

function QuizPage() {
  const [data, setData] = useState<quizData[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = "https://the-trivia-api.com/v2/questions/";
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      mixAnswers(
        data[dataIndex]?.correctAnswer,
        data[dataIndex]?.incorrectAnswers
      );
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      mixAnswers(
        data[dataIndex]?.correctAnswer,
        data[dataIndex]?.incorrectAnswers
      );
    }
  }, [dataIndex]);

  function mixAnswers(correct: string, incorrect: [string]) {
    const mixedAnswers = [...incorrect, correct].sort(
      () => Math.random() - 0.5
    );
    setAnswers(mixedAnswers);
    console.log(data[dataIndex].correctAnswer);
  }

  function handleClick() {
    setDataIndex(dataIndex + 1);
    setIsDisabled(false);
    setNextClicked(true);
    // console.log("Next clicked:", nextClicked);
  }

  function handleIsDisabled(e: React.SyntheticEvent) {
    if (e) {
      setIsDisabled(true);
    }
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center text-[50px]">Quiz</h1>
      <div
        className="shadow-md w-[350px] h-[75vh] bg-[white] border-[1px] border-[#d4d4d4] rounded-[20px] 
      flex flex-col items-center justify-between p-[10px]"
      >
        <p>Points: </p>
        <div className="h-[30%] w-[100%] px-12 rounded-[20px] flex justify-center text-center select-none">
          {data.length > 0 && data[dataIndex]?.question.text}
        </div>
        <div className="flex flex-col gap-5 px-5 w-[100%]">
          {answers.map((ans, index) => (
            <AnswerButton
              onclick={handleIsDisabled}
              text={ans}
              key={index}
              correct={data[dataIndex].correctAnswer}
              isDisabled={isDisabled}
              nextClicked={nextClicked}
            />
          ))}
        </div>
        <button
          onClick={handleClick}
          className="w-[20%] self-center p-1 rounded-[5px] bg-[#5856E9] hover:bg-[#6e6ee5] text-[white] transition-all"
        >
          next
        </button>
      </div>
    </section>
  );
}

export default QuizPage;
