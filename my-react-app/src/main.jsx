import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// eslint-disable-next-line no-unused-vars
import ProfilePage from './Pages/ProfilePage/index.jsx'
import Login from './Pages/AuthenticationPage/Login/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ProfilePage/> */}
    <Login/>
  </StrictMode>,
)
