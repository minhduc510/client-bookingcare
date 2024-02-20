/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import path from '@/routes/path'
import { apiNoToken } from '@/api'
import cookies from '@/utils/cookies'
import { useAppDispatch } from '@/redux/hooks'
import { loginAdded } from '@/redux/slices/auth'
import axios from 'axios'
import { Typography } from '@mui/material'

const LoginSocialSuccess = () => {
  const { id, typeLogin } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isError, setIsError] = useState(false)

  if (isError) {
    setTimeout(() => {
      navigate(`/${path.client.login}`)
    }, 2000)
  }

  useEffect(() => {
    if (
      typeLogin === 'google' ||
      typeLogin === 'facebook'
    ) {
      const tokenCookie = cookies.get('tokenSocial')

      if (tokenCookie) {
        const callApi = async () => {
          const { error, data } =
            await apiNoToken.loginSocial(id as string)
          if (!error) {
            dispatch(loginAdded(data.accessToken))
            navigate(`${path.client.home}`)
          } else {
            navigate(`/${path.client.login}`)
          }
        }
        const checkToken = async () => {
          if (typeLogin === 'google') {
            const { data } = await axios.get(
              `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokenCookie}`
            )
            if (data?.verified_email) {
              callApi()
            } else {
              setIsError(true)
            }
          }
          if (typeLogin === 'facebook') {
            const { data } = await axios.get(
              `https://graph.facebook.com/me?access_token=${tokenCookie}`
            )
            if (data?.id) {
              callApi()
            } else {
              setIsError(true)
            }
          }
        }
        checkToken()
      } else {
        setIsError(true)
      }
    } else {
      setIsError(true)
    }
  }, [])
  return (
    <>
      {isError && (
        <Typography fontSize={'1.5rem'} fontWeight={600}>
          Bạn phải đăng nhập thông qua cách ấn vào nút đăng
          nhập bằng mạng xã hội
        </Typography>
      )}
    </>
  )
}

export default LoginSocialSuccess
