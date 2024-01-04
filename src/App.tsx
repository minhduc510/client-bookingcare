import { Route, Routes } from 'react-router-dom'
import Admin from './layouts/admin'
import User from './pages/admin/User'
import Login from './pages/admin/Login'
import Doctor from './pages/admin/Doctor'
import Slider from './pages/admin/Slider'
import Dashboard from './pages/admin/Dashboard'
import ForgotPassword from './pages/admin/ForgotPassword'
import RecoverPassword from './pages/general/recoverPassword'

import path from './routes/path'

import AuthMiddleware from './middleware/AuthMiddleware'

function App() {
  return (
    <>
      <Routes>
        <Route path={`${path.admin.path}`}>
          <Route element={<Admin />}>
            <Route element={<AuthMiddleware />}>
              <Route
                path={`${path.admin.children.dashboard}`}
                element={<Dashboard />}
              />
              <Route
                path={`${path.admin.children.users}`}
                element={<User />}
              />
              <Route
                path={`${path.admin.children.doctors}`}
                element={<Doctor />}
              />
              <Route
                path={`${path.admin.children.sliders}`}
                element={<Slider />}
              />
            </Route>
          </Route>
          <Route
            path={`${path.login}`}
            element={<Login />}
          />
          <Route
            path={`${path.admin.children.forgotPassword}`}
            element={<ForgotPassword />}
          />
        </Route>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route
          path="/get-password"
          element={<RecoverPassword />}
        />
      </Routes>
    </>
  )
}

export default App
