import { supabase } from '@/lib/supabase'
import { useModalStore } from '@/store/useModalStore'
import { AuthContextType } from '@/types/type'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  })
  const { openModal } = useModalStore()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userId')
      setUserId(storedEmail)
    }
  }, [])

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { name, email, address } = user?.user_metadata ?? {}
        setUserInfo({ name, email, address })
      } catch (error) {
        console.error('사용자 정보 조회 중 오류 발생:', error)
        setUserInfo({
          name: '',
          email: '',
          address: '',
        })
      }
    }

    fetchUserInfo()
  }, [userId])

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('userId')
    setUserId(null)
    openModal({ type: 'LOGOUT_MESSAGE' })
  }

  return (
    <AuthContext.Provider value={{ userId, setUserId, logout, userInfo }}>
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
