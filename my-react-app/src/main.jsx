import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Pages/AuthenticationPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ProfilePage/> */}
    <Login/>
  </StrictMode>,
)
