import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePg from '../pages/HomePg';
import AddReviewPg from '../pages/AddReviewPg';
import Layout from '../layout/components/Layout';
import NewReviewPg from '../pages/NewReviewPg';
import BestReviewPg from '../pages/BestReviewPg';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePg />} />
          <Route path="/add-review" element={<AddReviewPg />} />
          <Route path="/new-review" element={<NewReviewPg />} />
          <Route path="/best-review" element={<BestReviewPg />} />
          <Route path="/mypage" element={<BestReviewPg />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
