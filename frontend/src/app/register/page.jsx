"use client";

import RegisterForm from "@/components/RegisterForm";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/users/register", formData);
            setUser(res.data);
            router.push("/");
        } catch (error) {
            setError(error.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-title">Register</h2>
                {error && <p>{error}</p>}

                <RegisterForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
