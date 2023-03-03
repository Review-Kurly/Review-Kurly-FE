import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePg from '../pages/HomePg';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePg />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
