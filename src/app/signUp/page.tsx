'use client'

import { AuthScreen } from "@/components/organisms/AuthScreen";
import { singUp } from "@/service/UserService";
import { useRouter } from "next/navigation";

function SignUpPage() {
    const router = useRouter();


    const handleRegister = async (email: string, password: string) => {
        await singUp(email, password)
        router.push("/pages/home");
    };

    return (
        <AuthScreen
            type="register"
            onSubmit={handleRegister}
            title="Registrar"
            link={<a href="/login">Já possui uma conta? Clique aqui</a>}
        />
    );
}

export default SignUpPage