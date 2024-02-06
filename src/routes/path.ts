import adminRoute from './admin'
import clientRoute from './client'
import doctorRoute from './doctor'

const path = {
  admin: { ...adminRoute },
  client: { ...clientRoute },
  doctor: { ...doctorRoute }
}

export default path
