/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from 'swr'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import MediaSaid from './MediaSaid'
import SlideTitle from './SlideTitle'
import DoctorSlice from './DoctorSlice'
import GeneralSlice from './GeneralSlice'
import { apiNoToken, linkApi } from '@/api'
import { SpecialistProps } from '@/interface'
import { DATA_CLINIC } from '@/utils/constant'
import ComprehensiveService from './ComprehensiveService'

const Home = () => {
  const [specialists, setSpecialist] = useState<
    SpecialistProps[]
  >([])
  const { data: dataSpecialist, isLoading } = useSWR(
    linkApi.getAllSpecialist,
    apiNoToken.getAllSpecialist(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  useEffect(() => {
    if (dataSpecialist) {
      setSpecialist(dataSpecialist.data)
    }
  }, [isLoading])

  return (
    <>
      <SlideTitle />
      <ComprehensiveService />
      <GeneralSlice
        name={'Chuyên khoa'}
        data={specialists}
        type="Specialist"
      />
      <DoctorSlice />
      <Box sx={{ marginTop: 5 }}>
        <GeneralSlice
          name={'Cơ sở y tế'}
          data={DATA_CLINIC}
          type="Clinic"
        />
      </Box>
      <MediaSaid />
    </>
  )
}

export default Home
