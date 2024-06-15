import { Calculator } from "@/components/calculator";
import { Header } from "@/components/header";
import { Route, Routes } from "react-router-dom";
import { Footer } from "@/components/footer";
import { Eligibility } from "@/components/eligibility";
import { PrivacyPolicy } from "@/components/privacy-policy";

function App() {
  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
