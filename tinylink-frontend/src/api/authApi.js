import api from "./api";

export function registerUser(userData) {
    return api.post("/register", userData);
}

export function loginUser(credentials) {
    return api.post("/login", credentials);
}

export function logoutUser() {
    return api.post("/logout");
}

export function getCurrentUser() {
    return api.get("/me");
}

export function forgotPassword(email) {
    return api.post("/forgot-password", {
        email,
    });
}
export function resetPassword(data) {
    return api.post("/reset-password", data);
}