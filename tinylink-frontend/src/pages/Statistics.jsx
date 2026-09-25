import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUrlStats } from "../api/urlAPI";

function Statistics() {
    const { id } = useParams();

    const [url, setUrl] = useState(null);
    const [error, setError] = useState("");

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
        return <p>{error}</p>;
    }

    if (!url) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>URL Statistics</h2>

            <p>Original URL: {url.original_url}</p>
            <p>Short Code: {url.short_code}</p>
            <p>Clicks: {url.click_count}</p>
        </div>
    );
}

export default Statistics;