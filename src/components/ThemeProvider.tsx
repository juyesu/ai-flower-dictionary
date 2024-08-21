'use client'
import { ThemeProvider } from 'next-themes'

export type ChildrenComponentsProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ChildrenComponentsProps) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default Providers
