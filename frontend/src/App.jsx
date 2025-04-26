import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Homes";
import Result from "./Pages/Result";
import BuyCredit from "./Pages/BuyCredit";
import Footer from "./Components/Footer";
import PgNotFound from "./Pages/404PgNotFound";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer position="bottom-right" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="*" element={<PgNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
