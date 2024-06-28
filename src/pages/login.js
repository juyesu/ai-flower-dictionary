// 'use client';
import { useRouter } from "next/navigation";
import Axios from 'axios';
import Layout from '@/components/layout';

export default function Login() {
    const router = useRouter();
    function login() {
        Axios.post('/api/login').then((res) => {
            if (res.status === 200) {
                router.push('/admin')
            }
        })
    }

    return (
        <Layout>
            <div className="flex flex-row justify-center items-center w-2/3 h-48 mt-48 mx-24 border border-gray-200">
                <div className="flex flex-col w-3/5 h-1/2 gap-3">
                    <input className="pl-4 h-full border border-gray-200" placeholder="ID" />
                    <input className="pl-4 h-full border border-gray-200" type="password" placeholder="Password" />
                </div>
                <button className="ml-4 w-1/3 h-2/5 bg-rose-300/50 font-bold text-gray-100" onClick={login}>Login</button>
            </div>
        </Layout>
    )
}