import { useEffect, useState } from "react";
import { getUrls, createUrl, deleteUrl } from "../api/urlAPI";
import { Link } from "react-router-dom";

function MyUrl() {
    const [urls, setUrls] = useState([]);
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [shortCode, setShortCode] = useState("");

    async function fetchUrls() {
        try {
            const response = await getUrls();

            setUrls(response.data.data.data);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to load URLs"
            );
        } finally {
            setLoading(false);
        }
    }
    

    async function handleDelete(id) {
        try {
            const response = await deleteUrl(id);

            setMessage(response.data.message);

            fetchUrls();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to delete URL"
            );
        }
    }

    useEffect(() => {
        fetchUrls();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await createUrl({
                url: url,
                short_code: shortCode || undefined,
            });

            setMessage(response.data.message);
            setUrl("");
            setShortCode("");

            fetchUrls();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to shorten URL"
            );
        }
    }

    return (
        <div>
            <h2>My URL</h2>
            
            <h3>Shorten a URL</h3>

            <form onSubmit={handleSubmit}>
                <input type="url" placeholder="Enter URL" value={url} onChange={(event) => setUrl(event.target.value)} required />
                <input type="text" placeholder="Custom code (optional)" value={shortCode} onChange={(event) => setShortCode(event.target.value)} />
                <button type="submit">
                    Shorten
                </button>
            </form>

            <p>{message}</p>

            <h3>Your URLs</h3>

            {loading ? (
                <p>Loading...</p>
            ) : urls.length === 0 ? (
                <p>No URLs found.</p>
            ) : (
                <div>
                    {urls.map((item) => (
                        <div key={item.id}>
                            <p>Original URL: {item.original_url}</p>
                            <p>Short Code: {item.short_code}</p>

                            <Link to={`/urls/${item.id}`}>
                                Statistics
                            </Link>
                            <button onClick={() => handleDelete(item.id)}>
                                Delete
                            </button>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyUrl;