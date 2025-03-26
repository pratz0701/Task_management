import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomeScreen from './HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UiRoutes } from './Constants/constants';
import TaskPage from './Pages/TaskPage';
import Login from './Pages/AuthenticationPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="app-content">
        <Routes>
          <Route exact path={UiRoutes.homeScreen} element={<HomeScreen />} />
          <Route path={UiRoutes.taskPage} element={<TaskPage />} />
          <Route path={UiRoutes.loginPage} element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
