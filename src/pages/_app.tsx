import React from 'react'
import { AppProps } from 'next/app';
import '../../styles/globals.css'
import dotenv from 'dotenv'

const MyApp = ({ Component, pageProps }: AppProps) => {
  dotenv.config()
  return <Component {...pageProps} />
}

export default MyApp
