'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userCookie = Cookies.get('user')
    const tokenCookie = Cookies.get('token')

    if (userCookie) {
      setUser(JSON.parse(userCookie))
    }
    if (tokenCookie) {
      setToken(tokenCookie)
    } else {
      router.push('/login')
    }
  }, [router])

  return <UserContext.Provider value={{ user, setUser, token, setToken }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
