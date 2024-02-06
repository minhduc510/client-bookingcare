import SlideTitle from './SlideTitle'
import DoctorSlice from './DoctorSlice'
import GeneralSlice from './GeneralSlice'
import ComprehensiveService from './ComprehensiveService'
import MediaSaid from './MediaSaid'

const Home = () => {
  return (
    <>
      <SlideTitle />
      <ComprehensiveService />
      <GeneralSlice />
      <DoctorSlice />
      <MediaSaid />
    </>
  )
}

export default Home
