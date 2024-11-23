import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailsPage from "./pages/DetailsPage";
import ExchangesPage from "./pages/ExchangesPage";
import Test from "./pages/Test";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/exchanges" element={<ExchangesPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
