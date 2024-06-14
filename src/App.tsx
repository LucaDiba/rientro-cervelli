import { Calculator } from "@/components/calculator";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Calculator />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
