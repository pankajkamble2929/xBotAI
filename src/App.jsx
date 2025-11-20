import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import History from './pages/History';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
