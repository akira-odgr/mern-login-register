"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";

export const Home = () => {
    const { user, setUser, error, setError, isLoading, setIsLoading } =
        useUser();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get("/api/users/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUser(res.data);
                } catch (error) {
                    setError("Failed to fetch user data");
                    localStorage.removeItem("token");
                }
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [setError, setUser, setIsLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex-center bg-gray-900">
                <div className="text-xl text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-lg text-center p-8 rounded-lg shadow-md">
                {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                {user ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Welcome, {user.username}
                        </h2>
                        <p className="text-gray-600">Email: {user.email}</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-shadow-gray-800">
                            Welcome!
                        </h2>
                        <p className="text-2xl font-bold mb-6 text-gray-800">
                            Please log in or register
                        </p>
                        <div className="flex flex-col gap-y-4">
                            <Link
                                href="/login"
                                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
