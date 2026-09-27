
import { useState, useEffect } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const nagivate = useNavigate();

    useEffect(() => {
        document.title = "Register - TinyLink";
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await registerUser({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            setMessage(response.data.message);
            nagivate("/login");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    }

    return (
        <div className="flex items-center min-h-screen justify-center">
            <div className= " py-10 px-10 border-2 border-gray-800 rounded-md w-96 shadow-2xl bg-gray-50 flex flex-col items-center">

                <h1 className="text-3xl font-bold text-gray-800 mb-1">TinyLink</h1>
                <p className="text-gray-500 mb-6">Create your account</p>

                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
                            className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-800 text-white font-bold py-2 rounded-md mt-2 hover:bg-gray-700 transition"
                    >
                        Register
                    </button>
                </form>

                {message && <p className="text-sm text-red-600 mt-4">{message}</p>}

                <p className="text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-gray-800 underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;

