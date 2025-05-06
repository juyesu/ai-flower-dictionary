import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      router.replace('/')
    }
  }, [userId, router])

  if (userId) return null

  return <>{children}</>
}

export default RedirectIfAuthenticated
