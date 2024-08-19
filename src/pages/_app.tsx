import React from 'react'
import '../../styles/globals.css'
import dotenv from 'dotenv'

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  dotenv.config()
  return <Component {...pageProps} />
}

export default MyApp
