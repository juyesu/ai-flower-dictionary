import LogoutMessageModal from '@/components/modal/LogoutMessageModal'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface AuthContextType {
  loginUser: string | null
  setLoginUser: (user: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginUser, setLoginUser] = useState<string | null>(null)
  const [openLogoutMessageModal, setOpenLogoutMessageModal] = useState(false)

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
    setOpenLogoutMessageModal(true)
    window.location.reload()
  }

  const logoutMessageModalClose = () => {
    setOpenLogoutMessageModal(false)
  }

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser, logout }}>
      {children}
      {openLogoutMessageModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <LogoutMessageModal onClose={logoutMessageModalClose} />
        </div>
      )}
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
