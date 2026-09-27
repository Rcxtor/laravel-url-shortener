import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyUrl from "./pages/MyUrl";
import Statistics from "./pages/Statistics";
import Navbar from "./component/Navbar";
import ShortCode from "./pages/ShortCode";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";


import ProtectedRoute from "./route/ProtectedRoute";
import GuestRoute from "./route/GuestRoute";

function App() {
    return (
        <AuthProvider>

            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:shortCode" element={<ShortCode />} />
                    <Route path="*" element={<NotFound />} />

                    {/* Protected */}
                    <Route path="/my-url" element={<ProtectedRoute><MyUrl /></ProtectedRoute>}/>
                    <Route path="/urls/:id" element={ <ProtectedRoute> <Statistics /> </ProtectedRoute> }/>

                    {/* Guest */}
                    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                    <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                    <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>}/>
                    <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>}/>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

