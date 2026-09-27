import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
            document.title = "Forget Password - TinyLink";
        }, []);
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await forgotPassword(email);

            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to send reset link."
            );
        }
    }

    return (
        <div className="flex items-center min-h-screen justify-center">
            <div className="py-10 px-10 border-2 border-gray-800 rounded-md w-96 shadow-2xl bg-gray-50 flex flex-col items-center">

                <h1 className="text-3xl font-bold text-gray-800 mb-1">TinyLink</h1>
                <p className="text-gray-500 mb-6 text-center">
                    Enter your email and we'll send you a reset link
                </p>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-800 text-white font-bold py-2 rounded-md mt-2 hover:bg-gray-600 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                {message && <p className="text-sm text-gray-700 mt-4 text-center">{message}</p>}

                <p className="text-sm text-gray-500 mt-6">
                    Remembered your password?{" "}
                    <Link to="/login" className="font-semibold text-gray-800 underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}