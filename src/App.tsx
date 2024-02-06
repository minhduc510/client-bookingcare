import { Route, Routes } from 'react-router-dom'

import Admin from './layouts/admin'
import Client from './layouts/client'
import User from './pages/admin/User'
import Doctor from './pages/admin/Doctor'
import DoctorLayout from './layouts/doctor'
import Slider from './pages/admin/Slider'
import LoginAdmin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ForgotPassword from './pages/admin/ForgotPassword'
import RecoverPassword from './pages/general/recoverPassword'

import path from './routes/path'

import Home from './pages/client/Home'
import LoginClient from './pages/client/Login'
import RegisterClient from './pages/client/Register'
import DoctorDetail from './pages/admin/Doctor/DoctorDetail'
import DetailDoctor from './pages/client/DetailDoctor'
import AuthMiddleware from './middleware/AuthMiddleware'
import EstablishDoctor from './pages/admin/EstablishDoctor'
import DoctorUpdate from './pages/admin/Doctor/DoctorUpdate'
import DoctorCreate from './pages/admin/Doctor/DoctorCreate'
import ForgotPasswordClient from './pages/client/ForgotPassword'
import MedicalSchedule from './pages/admin/MedicalSchedule'
import CallApiGeneral from './components/CallApiGeneral'
import Booking from './pages/client/Booking'
import ListSchedule from './pages/doctor/ListSchedule'
import ManageSchedule from './pages/doctor/ManageSchedule'
import LoginDoctor from './pages/doctor/Login'
import RegisterDoctor from './pages/doctor/Register'
import ForgotPasswordDoctor from './pages/doctor/ForgotPassword'
import Specialist from './pages/admin/Specialist'
import SpecialistCreate from './pages/admin/Specialist/SpecialistCreate'
import SpecialistUpdate from './pages/admin/Specialist/SpecialistUpdate'

function App() {
  return (
    <>
      <CallApiGeneral />
      <Routes>
        {/* ADMIN PAGE */}
        <Route element={<Admin />}>
          <Route element={<AuthMiddleware />}>
            <Route
              path={`${path.admin.home}`}
              element={<Dashboard />}
            />
            <Route
              path={`${path.admin.users}`}
              element={<User />}
            />
            <Route
              path={`${path.admin.doctors}`}
              element={<Doctor />}
            />
            <Route
              path={`${path.admin.doctorCreate}`}
              element={<DoctorCreate />}
            />
            <Route
              path={`${path.admin.doctorDetail}`}
              element={<DoctorDetail />}
            />
            <Route
              path={`${path.admin.doctorUpdate}`}
              element={<DoctorUpdate />}
            />
            <Route
              path={`${path.admin.sliders}`}
              element={<Slider />}
            />
            <Route
              path={`${path.admin.establishDoctor}`}
              element={<EstablishDoctor />}
            />
            <Route
              path={`${path.admin.medicalSchedule}`}
              element={<MedicalSchedule />}
            />
            <Route
              path={`${path.admin.specialist}`}
              element={<Specialist />}
            />
            <Route
              path={`${path.admin.specialistCreate}`}
              element={<SpecialistCreate />}
            />
            <Route
              path={`${path.admin.specialistUpdate}`}
              element={<SpecialistUpdate />}
            />
          </Route>
        </Route>
        <Route
          path={`${path.admin.login}`}
          element={<LoginAdmin />}
        />
        <Route
          path={`${path.admin.forgotPassword}`}
          element={<ForgotPassword />}
        />

        {/* DOCTOR PAGE */}
        <Route element={<DoctorLayout />}>
          <Route
            path={`${path.doctor.listSchedule}`}
            element={<ListSchedule />}
          />
          <Route
            path={`${path.doctor.manageSchedule}`}
            element={<ManageSchedule />}
          />
        </Route>
        <Route
          path={`${path.doctor.login}`}
          element={<LoginDoctor />}
        />
        <Route
          path={`${path.doctor.register}`}
          element={<RegisterDoctor />}
        />
        <Route
          path={`${path.doctor.forgotPassword}`}
          element={<ForgotPasswordDoctor />}
        />

        {/* CLIENT PAGE */}
        <Route path={`${path.client.home}`}>
          <Route element={<Client />}>
            <Route path="" element={<Home />} />
            <Route
              path={path.client.login}
              element={<LoginClient />}
            />
            <Route
              path={path.client.register}
              element={<RegisterClient />}
            />
            <Route
              path={path.client.forgotPassword}
              element={<ForgotPasswordClient />}
            />
            <Route
              path={path.client.doctorDetail}
              element={<DetailDoctor />}
            />
            <Route
              path={path.client.booking}
              element={<Booking />}
            />
          </Route>
        </Route>
        <Route
          path="/get-password"
          element={<RecoverPassword />}
        />
      </Routes>
    </>
  )
}

export default App
