import React from 'react'
import Layout from '@/components/layout'
import Link from 'next/link'

const Admin = () => {
  return (
    <Layout>
      <div className="flex flex-col items-start w-full mt-32 ml-6">
        <h1>회원 페이지입니다.</h1>
        <Link href="/">
          <button className="mt-4 w-16 h-8 border">Logout</button>
        </Link>
      </div>
    </Layout>
  )
}

export default Admin
