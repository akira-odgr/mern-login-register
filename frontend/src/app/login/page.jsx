"use client";

import LoginForm from "@/components/LoginForm";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
    const { setUser } = useUser();
    const { error, setError } = useUser;
    const [formData, setFormData] = useState({ email: "", password: "" });
    // const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/login", formData);
            localStorage.setItem("token", res.data.token);
            setUser(res.data);
            router.push("/");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-title">Login</h2>
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

                <LoginForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                />
            </div>
        </div>
    );
};

export default LoginPage;
