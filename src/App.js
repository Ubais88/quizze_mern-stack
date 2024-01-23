import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Analytics from "./components/analytics/Analytics";
import './App.css'
import QuestionAnalysis from "./components/questionsAnalysis/QuestionAnalysis";
import PlayQuiz from "./pages/playQuiz/PlayQuiz";

const App = () => {
  
  return (
    <div style={{ display: "flex" }}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/*"
          element={
            <div className="homeComponents">
              <Sidebar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/questionsanalytics" element={<QuestionAnalysis/>} />
              </Routes>
            </div>
          }
        />
        <Route path="/playquiz" element={<PlayQuiz/>} />
        
      </Routes>
    </div>
  );
};

export default App;
