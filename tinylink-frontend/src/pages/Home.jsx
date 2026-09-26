import { useState } from "react";
import GuestBox from "../component/GuestBox";
import UserBox from "../component/UserBox";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { isAuthenticated } = useAuth();
    const [shortCode, setShortCode] = useState("");
    function handleSubmit(event) {
        event.preventDefault();

        const value = shortCode.trim();

        
        if (!value) {
            return;
        }
        
        window.location.href = `/${value}`;
    }
    

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-6xl font-bold text-gray-800">TinyLink</h1>

            <p className="mt-4 text-2xl mb-10">Shorten your links, simply.</p>

            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <input type="text" className="w-full border-2 rounded-md text-center py-2 px-8 focus:outline-none focus:border-gray-500 transition-colors" placeholder="Paste Code to Redirect" value={shortCode} onChange={(event) => setShortCode(event.target.value)}/>
                <button className="w-16 h-16 flex items-center justify-center border-2 border-gray-800 rounded-full font-bold text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg cursor-pointer" type="submit">
                    Go
                </button>
            </form>
            {!isAuthenticated ? (<GuestBox/>):(<UserBox/>)}
           
            
        </div>
    );
}

export default Home;