import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePg from '../pages/HomePg';
import AddReviewPg from '../pages/AddReviewPg';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePg />} />
        <Route path="/addreview" element={<AddReviewPg />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
