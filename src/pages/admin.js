import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "axios";
import Layout from '@/components/layout';

export default function Admin() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    function checkLogin() {
        Axios.get("/api/isLogin").then((res) => {
            if (res.status === 200 && res.data.name) {
                // 로그인
                setIsLogin(true);
            } else {
                // 로그인 안됨
                router.push("/login");
            }
        })
    }

    function logout() {
        Axios.get("/api/logout").then((res) => {
            if (res.status === 200) {
                router.push("/");
            }
        })
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <Layout>
            <div className="flex flex-col items-start w-full mt-32 ml-6">
                <h1>회원 페이지입니다.</h1>
                {isLogin && <button onClick={logout} className="mt-4 w-16 h-8 border">Logout</button>}
            </div>
        </Layout>
    )
}