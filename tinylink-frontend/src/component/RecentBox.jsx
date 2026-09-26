import { useEffect, useState } from "react";
import { getUrls } from "../api/urlAPI";
import { Link } from "react-router-dom";

export default function RecentBox(){
    const [recentUrls, setRecentUrls] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchRecentUrls() {
            try {
                const response = await getUrls();

                setRecentUrls(response.data.data.data.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch recent URLs:", error);
            }
        }

        fetchRecentUrls();
    }, []);
    return(
        <div className="flex flex-col gap-2 w-[80%]">
            <h1 className="my-2">Recent URLs</h1>
            {recentUrls.map((url) => (
            <div key={url.id} className="border-2 flex flex-row items-center justify-between rounded-lg border-gray-800 py-2 px-3">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-blue-950">{window.location.origin}/{url.short_code}</h2>
                    <p className="text-sm text-gray-600">{url.original_url}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <Link to={`/${url.short_code}`}  className="text-xs py-1 px-2 font-bold border-2 border-gray-800 rounded-full bg-gray-800 text-white hover:bg-gray-400 hover:border-gray-800 hover:text-gray-800 transition-all duration-300">
                        Visit
                    </Link> 
                    <button  onClick={()=>{navigator.clipboard.writeText(`${window.location.origin}/${url.short_code}`);
                        setCopied(url.id)
                    }} className="text-xs py-1 px-2 border-2 border-gray-800 rounded-full font-bold text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg cursor-pointer">
                       {copied== url.id ? "Copied" : "Copy"}
                    </button> 
                    <button  className="text-xs py-1 px-2 border-2 border-gray-800 rounded-full font-bold text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg cursor-pointer">
                        QR
                    </button> 
                </div>
            </div>
            ))}
        </div>
    )
}