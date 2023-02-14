import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";

const Home = lazy(() => import("./pages/Home"));
const Workshop = lazy(() => import("./pages/Workshop"));
const PriceBoard = lazy(() => import("./pages/pricing/PriceBoard"));
const Article = lazy(() => import("./pages/Article"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="col text-center p-5">
            __ Preparing the Page
            <LoadingOutlined />
            RE. Kindly wait... __
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/workshop" element={<Workshop />} />
          <Route exact path="/pmb" element={<PriceBoard />} />
          <Route exact path="/article" element={<Article />} />
          <Route exact path="/article/:slug" element={<Article />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
