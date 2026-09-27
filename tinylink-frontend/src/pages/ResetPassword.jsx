import { useState,useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
                document.title = "Password Reset - TinyLink";
            }, []);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await resetPassword({
                email,
                token,
                password,
                password_confirmation: passwordConfirmation,
            });

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to reset password."
            );
        }
    }

    return (
        <div className="flex items-center min-h-screen justify-center">
            <div className="py-10 px-10 border-2 border-gray-800 rounded-md w-96 shadow-2xl bg-gray-50 flex flex-col items-center">

                <h1 className="text-3xl font-bold text-gray-800 mb-1">TinyLink</h1>
                <p className="text-gray-500 mb-6 text-center">
                    Choose a new password for your account
                </p>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(event) => setPasswordConfirmation(event.target.value)}
                            required
                            className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-800 text-white font-bold py-2 rounded-md mt-2 hover:bg-gray-600 transition"
                    >
                        Reset Password
                    </button>
                </form>

                {message && <p className="text-sm text-gray-700 mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
}