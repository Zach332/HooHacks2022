import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { QuizPage } from './quiz';
import { SummaryPage } from './summary';
import App from './App';

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="summary" element={<SummaryPage />} />
        </Routes>
    </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
