import React from 'react'
import { AppProps } from 'next/app'
import '@styles/globals.css'
import dotenv from 'dotenv'
import Providers from '@/components/common/ThemeProvider'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  dotenv.config()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
