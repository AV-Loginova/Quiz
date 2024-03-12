import { useEffect, useState } from "react";

function QuizPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const url = "https://opentdb.com/api.php?amount=10&type=multiple";
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center text-[50px]">Quiz</h1>
      <div className="shadow-md w-[350px] h-[70vh] bg-[white] border-[1px] border-[#d4d4d4] rounded-[20px]">
        <div className="h-[30%] w-[80%] rounded-[20px]"></div>
      </div>
    </section>
  );
}

export default QuizPage;
