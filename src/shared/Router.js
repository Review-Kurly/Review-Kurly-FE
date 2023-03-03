import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/components/Layout';
import Home from '../pages/HomePg';
import AddReview from '../pages/AddReviewPg';
import NewReview from '../pages/NewReviewPg';
import BestReview from '../pages/BestReviewPg';
import SignUp from '../feature/signUp/SignUp';
import LogIn from '../feature/logIn/LogIn';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/new-review" element={<NewReview />} />
          <Route path="/best-review" element={<BestReview />} />
          <Route path="/mypage" element={<BestReview />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up" element={<LogIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
