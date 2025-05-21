'use client'

import { AuthScreen } from "@/components/organisms/AuthScreen";
import { login } from "@/service/UserService";
import { useRouter } from "next/navigation";

function LoginPage() {
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        const result = await login(email, password);
        router.push("/pages/home");
        console.log(result)
    };

    return (
        <AuthScreen
            type="login"
            onSubmit={handleLogin}
            title="Conectar"
            link={<a href="/signUp">Novo usuário? Clique aqui</a>}
        />
    );
}

export default LoginPage;
