// import * as Icon from "react-bootstrap-icons";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Design from "./components/Design/Design";
import QuizPage from "./components/QuizPage/QuizPage";

function App() {
  return (
    <section className="relative w-[100vw] min-h-[100vh] overflow-hidden font-['Poppins'] tracking-[-1px]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
      <Design />
    </section>
  );
}

export default App;
