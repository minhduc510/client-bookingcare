import { Route, Routes } from 'react-router-dom'

import Admin from './layouts/admin'
import Client from './layouts/client'
import User from './pages/admin/User'
import Slider from './pages/admin/Slider'
import Doctor from './pages/admin/Doctor'
import DoctorLayout from './layouts/doctor'
import LoginAdmin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ForgotPassword from './pages/admin/ForgotPassword'
import RecoverPassword from './pages/general/recoverPassword'

import path from './routes/path'

import Home from './pages/client/Home'
import Booking from './pages/client/Booking'
import LoginDoctor from './pages/doctor/Login'
import LoginClient from './pages/client/Login'
import NotFound from './pages/general/NotFound'
import Specialist from './pages/admin/Specialist'
import RegisterClient from './pages/client/Register'
import RegisterDoctor from './pages/doctor/Register'
import PersonalInfo from './pages/client/PersonalInfo'
import DashboardDoctor from './pages/doctor/Dashboard'
import DetailDoctor from './pages/client/DetailDoctor'
import ListSchedule from './pages/doctor/ListSchedule'
import SpecialistDetail from './pages/client/Specialist'
import AuthMiddleware from './middleware/AuthMiddleware'
import CallApiGeneral from './components/CallApiGeneral'
import PersonalInfoAdmin from './pages/admin/PersonalInfo'
import ManageSchedule from './pages/doctor/ManageSchedule'
import Auth2Middleware from './middleware/Auth2Middleware'
import ChangePassword from './pages/client/ChangePassword'
import EstablishDoctor from './pages/admin/EstablishDoctor'
import MedicalSchedule from './pages/admin/MedicalSchedule'
import DoctorDetail from './pages/admin/Doctor/DoctorDetail'
import DoctorUpdate from './pages/admin/Doctor/DoctorUpdate'
import DoctorCreate from './pages/admin/Doctor/DoctorCreate'
import PersonalInfoDoctor from './pages/doctor/PersonalInfo'
import ChangePasswordAdmin from './pages/admin/ChangePassword'
import ChangePasswordDoctor from './pages/doctor/ChangePassword'
import ForgotPasswordClient from './pages/client/ForgotPassword'
import ForgotPasswordDoctor from './pages/doctor/ForgotPassword'
import PersonalDetailDoctor from './pages/doctor/PersonalDetail'
import LoginSocialSuccess from './pages/general/LoginSocialSuccess'
import SpecialistCreate from './pages/admin/Specialist/SpecialistCreate'
import SpecialistUpdate from './pages/admin/Specialist/SpecialistUpdate'

function App() {
  return (
    <>
      <CallApiGeneral />
      <Routes>
        {/* ADMIN PAGE */}
        <Route element={<AuthMiddleware />}>
          <Route element={<Admin />}>
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
            <Route
              path={`${path.admin.changePassword}`}
              element={<ChangePasswordAdmin />}
            />
            <Route
              path={`${path.admin.personalInfo}`}
              element={<PersonalInfoAdmin />}
            />
          </Route>
        </Route>
        <Route element={<Auth2Middleware />}>
          <Route
            path={`${path.admin.login}`}
            element={<LoginAdmin />}
          />
          <Route
            path={`${path.admin.forgotPassword}`}
            element={<ForgotPassword />}
          />
        </Route>

        {/* DOCTOR PAGE */}
        <Route element={<AuthMiddleware />}>
          <Route element={<DoctorLayout />}>
            <Route
              path={`${path.doctor.home}`}
              element={<DashboardDoctor />}
            />
            <Route
              path={`${path.doctor.listSchedule}`}
              element={<ListSchedule />}
            />
            <Route
              path={`${path.doctor.manageSchedule}`}
              element={<ManageSchedule />}
            />
            <Route
              path={`${path.doctor.personalInfo}`}
              element={<PersonalInfoDoctor />}
            />
            <Route
              path={`${path.doctor.personalDetail}`}
              element={<PersonalDetailDoctor />}
            />
            <Route
              path={`${path.doctor.changePassword}`}
              element={<ChangePasswordDoctor />}
            />
          </Route>
        </Route>
        <Route element={<Auth2Middleware />}>
          <Route
            path={`${path.doctor.login}`}
            element={<LoginDoctor />}
          />
          <Route
            path={`${path.doctor.register}`}
            element={<RegisterDoctor />}
          />
        </Route>
        <Route
          path={`${path.doctor.forgotPassword}`}
          element={<ForgotPasswordDoctor />}
        />

        {/* CLIENT PAGE */}
        <Route path={`${path.client.home}`}>
          <Route element={<Client />}>
            <Route path="" element={<Home />} />
            <Route element={<Auth2Middleware />}>
              <Route
                path={path.client.login}
                element={<LoginClient />}
              />
              <Route
                path={path.client.register}
                element={<RegisterClient />}
              />
            </Route>
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
            <Route
              path={path.client.specialist}
              element={<SpecialistDetail />}
            />
            <Route element={<AuthMiddleware />}>
              <Route
                path={path.client.personalInfo}
                element={<PersonalInfo />}
              />
              <Route
                path={path.client.changePassword}
                element={<ChangePassword />}
              />
            </Route>
          </Route>
        </Route>
        <Route
          path="/get-password"
          element={<RecoverPassword />}
        />
        <Route
          path="/login-social-success/:typeLogin/:id"
          element={<LoginSocialSuccess />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
