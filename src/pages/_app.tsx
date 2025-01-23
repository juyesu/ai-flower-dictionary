import React from 'react'
import { AppProps } from 'next/app'
import '../../styles/globals.css'
import dotenv from 'dotenv'
import Providers from '@/components/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  dotenv.config()
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </QueryClientProvider>
  )
}

export default MyApp
