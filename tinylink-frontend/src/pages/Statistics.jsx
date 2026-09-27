import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUrlStats } from "../api/urlAPI";
import { Link } from "react-router-dom";

function Statistics() {
    const { id } = useParams();

    const [url, setUrl] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Statistics - TinyLink";
    }, []);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await getUrlStats(id);

                setUrl(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load statistics"
                );
            }
        }

        fetchStats();
    }, [id]);

   if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 border-2 border-red-600 rounded-md px-4 py-2">
                {error}
            </p>
        </div>
    );
}

if (!url) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500">Loading...</p>
        </div>
    );
}

return (
    <div className="min-h-screen py-10 px-4">
        <div className="max-w-md mx-auto">

            <h1 className="text-3xl font-bold text-gray-800 mb-6">URL Statistics</h1>

            <div className="border-2 border-gray-800 rounded-md bg-white p-6 shadow-2xl flex flex-col gap-4">

                <div>
                    <p className="text-sm text-gray-500">Short Link</p>
                    <p className="text-gray-800 font-medium truncate">
                        {window.location.origin}/{url.short_code}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Original URL</p>
                    <p className="text-gray-800 font-medium truncate">
                        {url.original_url}
                    </p>
                </div>

                <div className="border-t border-gray-300 pt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Total Clicks</p>
                    <p className="text-2xl font-bold text-gray-800">{url.click_count}</p>
                </div>

            </div>

            <Link
                to="/my-url"
                className="inline-block mt-6 border-2 border-gray-800 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-600 hover:text-white transition"
            >
                ← Back to My URLs
            </Link>
        </div>
    </div>
);
}

export default Statistics;