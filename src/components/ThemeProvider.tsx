'use client'
import { ThemeProvider } from 'next-themes'
import { ChildrenComponentsProps } from '@/types/type'

const Providers = ({ children }: ChildrenComponentsProps) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default Providers
