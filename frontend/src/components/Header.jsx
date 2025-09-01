"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const { user, setUser } = useUser();

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-bold">
                    MERN Auth
                </Link>
                <div>
                    {user ? (
                        <button
                            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-white mx-2 hover:underline"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="text-white mx-2 hover:underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
