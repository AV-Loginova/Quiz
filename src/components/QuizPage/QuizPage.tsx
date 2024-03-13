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
  const dataState: quizData[] = [];
  // const [dataState, setDataState] = useState<quizData[]>([]);
  const [data, setData] = useState<quizData[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  async function fetchData() {
    const url = "https://the-trivia-api.com/v2/questions/";
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      mixAnswers(
        data[dataIndex]?.correctAnswer,
        data[dataIndex]?.incorrectAnswers
      );
    }
  }, [data, dataIndex]);

  function mixAnswers(correct: string, incorrect: [string]) {
    const mixedAnswers = [...incorrect, correct].sort(
      () => Math.random() - 0.5
    );
    setAnswers(mixedAnswers);
    console.log(data[dataIndex].correctAnswer);
  }

  function handleClick() {
    if (dataIndex + 1 === 10) {
      setIsFinished(true);
    } else {
      setTimeout(() => {
        setDataIndex(dataIndex + 1);
      }, 200);
      setIsDisabled(false);
      setIsClicked(true);
    }
  }

  function handleIsDisabled(e: React.SyntheticEvent) {
    const val = e.target as HTMLElement;
    if (e) {
      setIsDisabled(true);
    }
    if (data[dataIndex]?.correctAnswer === val.innerText) {
      setCount(count + 100);
    }
  }

  function handleRestart() {
    setData(dataState);
    setAnswers([]);
    setDataIndex(0);
    setCount(0);
    setIsDisabled(false);
    setIsClicked(false);
    setIsFinished(false);
    fetchData();
  }
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center text-[50px]">Quiz</h1>
      <div
        className="shadow-md w-[350px] min-h-[75vh] h-[auto] bg-[white] border-[1px] border-[#d4d4d4] rounded-[20px] 
      flex flex-col items-center justify-between p-[10px] gap-[5px]"
      >
        {isFinished ? (
          <div className="w-[100%] h-[50vh] text-4xl flex flex-col justify-center items-center text-center gap-[50px]">
            <p>Your score:</p>
            <span className="animate-bounce text-[#5856e9]">
              {count} points
            </span>

            <button
              onClick={handleRestart}
              className="w-[50%] self-center p-1 rounded-[5px] bg-[#5856E9] hover:bg-[#6e6ee5] text-[white] text-[20px] transition-all"
            >
              Start again
            </button>
          </div>
        ) : (
          <>
            <p>Points: {count}</p>
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
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              ))}
            </div>
            <div className="w-[20%] ">
              <button
                onClick={handleClick}
                className="w-[100%] self-center p-1 rounded-[5px] bg-[#5856E9] hover:bg-[#6e6ee5] text-[white] transition-all"
              >
                next
              </button>
              <p className="text-center text-[gray] text-[12px]">
                {dataIndex + 1}/10
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default QuizPage;
