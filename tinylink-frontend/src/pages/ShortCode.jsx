import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { checkShortCode } from "../api/urlAPI";
import NotFound from "./NotFound";

function ShortCode() {
    const { shortCode } = useParams();
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        document.title = "Redirecting - TinyLink";
    }, []);

    useEffect(() => {
        checkShortCode(shortCode)
            .then((response) => {
                if (response.data.exists) {
                    window.location.href = `${BACKEND_URL}/${shortCode}`;
                } else {
                    setStatus("notfound");
                }
            })
            .catch(() => {
                setStatus("notfound");
            });
    }, [shortCode]);

    if (status === "checking") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="border-2 -mt-20 border-gray-800 rounded-md bg-white p-8 shadow-2xl flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Redirecting to link...</p>
                </div>
            </div>
        );
    }

    return <NotFound />;
}

export default ShortCode;