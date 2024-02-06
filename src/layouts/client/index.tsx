import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Options from '@/components/Options'

const Client = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Options />
    </>
  )
}

export default Client
