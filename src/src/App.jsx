/*
 * @Date: 2022-12-04 20:10:50
 * @LastEditTime: 2022-12-22 23:20:52
 * @Description:
 */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Suspense fallback={<div className="init-loading">加载中</div>}>
      <BrowserRouter>
        <div className="global-router">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="/*" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
