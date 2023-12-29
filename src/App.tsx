import { Route, Routes } from 'react-router-dom'
import Admin from './layouts/admin'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import User from './pages/admin/User'
import Doctor from './pages/admin/Doctor'
import Slider from './pages/admin/Slider'

function App() {
  return (
    <>
      <Routes>
        <Route path="admin">
          <Route element={<Admin />}>
            <Route path="" element={<Dashboard />} />
            <Route path="users" element={<User />} />
            <Route path="doctors" element={<Doctor />} />
            <Route path="sliders" element={<Slider />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </>
  )
}

export default App
