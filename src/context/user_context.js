import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0()

  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    setAuthUser(user)
  }, [user])

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, authUser }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
