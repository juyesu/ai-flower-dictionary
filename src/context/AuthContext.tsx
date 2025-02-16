import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  loginUser: string | null
  setLoginUser: (user: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginUser, setLoginUser] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userEmail')
      setLoginUser(storedEmail)
    }
  }, [])

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
    }
    setLoginUser(null)
    alert('로그아웃 되었습니다.')
  }

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
