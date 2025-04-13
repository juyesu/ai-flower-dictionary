import { useModalStore } from '@/store/useModalStore'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface AuthContextType {
  userId: string | null
  setUserId: (user: string | null) => void
  logout: () => void
  withdrawAccount: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null)
  const { openModal } = useModalStore()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userEmail')
      setUserId(storedEmail)
    }
  }, [])

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
    }
    setUserId(null)
    openModal({ type: 'LOGOUT_MESSAGE' })
  }

  const withdrawAccount = () => {
    localStorage.removeItem(`${userId}.name`)
    localStorage.removeItem(`${userId}.email`)
    localStorage.removeItem(`${userId}.password`)
    localStorage.removeItem(`${userId}.address`)
    localStorage.removeItem(`${userId}.likedPlants`)
    localStorage.removeItem(`${userId}.findPlants`)
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    openModal({ type: 'ACCOUNT_DELETION_SUCCESS' })
  }

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, logout, withdrawAccount }}
    >
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
