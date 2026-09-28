import { useEffect, useState } from "react";
import { getProfile , updateProfile, deleteAccount, changePassword } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordMessage, setPasswordMessage] = useState("");
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await getProfile();

                setName(response.data.data.name);
                setEmail(response.data.data.email);
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Failed to load profile."
                );
            }
        }

        fetchProfile();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await updateProfile({
                name,
                email,
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update profile."
            );
        }
    }

    async function handlePasswordChange(event) {
        event.preventDefault();

        try {
            const response = await changePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            setPasswordMessage(response.data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setPasswordMessage(
                error.response?.data?.message ||
                "Failed to change password."
            );
        }
    }
    async function handleDeleteAccount(event) {
        event.preventDefault();

        //confirmation
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await deleteAccount(deletePassword);

             window.alert(response.data.message);
            logout();
            navigate("/login");
        } catch (error) {
            setDeleteMessage(
                error.response?.data?.message ||
                "Failed to delete account."
            );
        }
    }

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Page header */}
                <div className="mb-8 py-2 px-2 bg-gray-50 border-gray-800 border-2 rounded-md">
                    <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account details and security.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* Your Details */}
                    <div className="border-2 border-gray-800 rounded-md bg-white shadow-2xl flex flex-col">
                        <div className="px-6 py-4 border-b-2 border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800">Your Details</h2>
                            <p className="text-sm text-gray-500">Update your name and email address.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 flex-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>

                            {message && <p className="text-sm text-gray-700">{message}</p>}

                            <button
                                type="submit"
                                className="bg-gray-800 text-white font-bold py-2 rounded-md hover:bg-gray-600 transition mt-auto"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="border-2 border-gray-800 rounded-md bg-white shadow-2xl flex flex-col">
                        <div className="px-6 py-4 border-b-2 border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800">Change Password</h2>
                            <p className="text-sm text-gray-500">Use a strong password you don't use elsewhere.</p>
                        </div>

                        <form onSubmit={handlePasswordChange} className="p-6 flex flex-col gap-4 flex-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    className="border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800"
                                />
                            </div>

                            {passwordMessage && <p className="text-sm text-gray-700">{passwordMessage}</p>}

                            <button
                                type="submit"
                                className="bg-gray-800 text-white font-bold py-2 rounded-md hover:bg-gray-600 transition mt-auto"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>

                {/* Row 2: Delete Account, full width */}
                <div className="border-2 border-red-600 rounded-md bg-white shadow-2xl">
                    <div className="px-6 py-4 border-b-2 border-gray-200">
                        <h2 className="text-lg font-bold text-red-600">Delete Account</h2>
                    </div>

                    <div className="p-6 flex flex-col md:flex-row md:items-end gap-6">
                        <p className="text-sm text-gray-600 md:flex-1">
                            Permanently delete your account and all your links. Your short links will stop
                            working. This can't be undone.
                        </p>

                        <form onSubmit={handleDeleteAccount} className="flex flex-col sm:flex-row gap-3 md:w-1/2">
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={deletePassword}
                                onChange={(event) => setDeletePassword(event.target.value)}
                                className="flex-1 border-2 border-red-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-600"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 text-white font-bold px-5 py-2 rounded-md hover:bg-red-700 transition"
                            >
                                Delete Account
                            </button>
                        </form>
                    </div>

                    {deleteMessage && <p className="text-sm text-red-600 px-6 pb-6 -mt-2">{deleteMessage}</p>}
                </div>

            </div>
        </div>
    );
}