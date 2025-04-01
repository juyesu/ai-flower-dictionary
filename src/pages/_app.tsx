import React from 'react'
import { AppProps } from 'next/app'
import '@styles/globals.css'
import dotenv from 'dotenv'
import Providers from '@/components/common/ThemeProvider'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (typeof window === 'undefined') {
    dotenv.config()
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Providers>
            <Component {...pageProps} />
          </Providers>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
