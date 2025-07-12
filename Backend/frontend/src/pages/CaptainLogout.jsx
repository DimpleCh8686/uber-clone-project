import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const token = localStorage.getItem('captain-token')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('captain-token')
        navigate('/captain-login')
      }
    })
    .catch(err => {
      console.error('Logout error:', err)
      navigate('/captain-login') 
    })
  }, [])

  return <div>Logging out...</div>
}

export default CaptainLogout
