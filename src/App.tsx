import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import { SetMetrics } from './pages/user/SetMetrics';
import { UserLayout } from './layouts/UserLayout';
import { Analytics } from './pages/user/Analytics';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<UserLayout/>}>
          <Route index element={<SetMetrics />} />
          <Route path='set-metrics' element={<SetMetrics />} />
          <Route path='/analytics/:campaignName' element={<Analytics />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
