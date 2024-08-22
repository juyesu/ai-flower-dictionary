import React from 'react'
import Layout from '@/components/layout'
import Link from 'next/link'

const Admin = () => {
  return (
    <Layout>
      <div className="flex flex-col items-start w-full mt-32 ml-6">
        <h1>회원 페이지</h1>
        <Link href="/" className="flex justify-center items-center mt-4 w-16 h-8 border">Logout</Link>
      </div>
    </Layout>
  )
}

export default Admin
