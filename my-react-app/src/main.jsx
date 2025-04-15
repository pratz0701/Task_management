import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomeScreen from './HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UiRoutes } from './Constants/constants';
import Login from './Pages/AuthenticationPage';
import UpsertTask from './Pages/UpsertTask';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="app-content">
        <Routes>
          <Route exact path={UiRoutes.homeScreen} element={<HomeScreen />} />
          <Route path={UiRoutes.loginPage} element={<Login />} />
          <Route path={UiRoutes.UpsertTask} element={<UpsertTask/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
