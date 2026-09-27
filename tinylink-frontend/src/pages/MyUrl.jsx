import { useEffect, useState } from "react";
import { getUrls, createUrl, deleteUrl } from "../api/urlAPI";
import { Link } from "react-router-dom";

function MyUrl() {
    const [urls, setUrls] = useState([]);
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [shortCode, setShortCode] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);


    const [urlToDelete, setUrlToDelete] = useState(null);

    useEffect(() => {
        document.title = "My URLs - TinyLink";
    }, []);
    
    async function fetchUrls(page = 1) {
        setLoading(true);
        try {
            const response = await getUrls({ per_page: 5, page });

            const paginator = response.data.data;
            setUrls(paginator.data);
            setCurrentPage(paginator.current_page);
            setLastPage(paginator.last_page);
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

            fetchUrls(currentPage);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to delete URL"
            );
        } finally {
            setUrlToDelete(null); // close the confirmation box either way
        }
    }

    useEffect(() => {
        fetchUrls(1);
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

            fetchUrls(1);
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to shorten URL"
            );
        }
    }

    return (

        <div className="min-h-screen  py-10 px-4">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">My URL</h1>

                <div className="border-2 border-gray-800 rounded-md bg-white p-6 mb-8 shadow-2xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Shorten a URL</h3>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="url"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                            required
                            className="flex-1 border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <input
                            type="text"
                            placeholder="Custom code (optional)"
                            value={shortCode}
                            onChange={(event) => setShortCode(event.target.value)}
                            className="sm:w-48 border-2 border-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 text-white font-bold px-6 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Shorten
                        </button>
                    </form>

                    {message && <p className="text-sm text-red-600 mt-3">{message}</p>}
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-4">Your URLs</h3>

                <div className="border-2 border-gray-800 rounded-md bg-white p-4 shadow-2xl">
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : urls.length === 0 ? (
                        <p className="text-gray-500">No URLs found.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {urls.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-2 border-gray-800 rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                                >
                                    <div className="min-w-0">
                                        <p className="text-gray-800 font-medium truncate">
                                            {window.location.origin}/{item.short_code}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.original_url}
                                        </p>
                                    </div>

                                    <div className="flex gap-3 shrink-0">
                                        <Link
                                            to={`/urls/${item.id}`}
                                            className="border-2 border-gray-800 rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-600 hover:text-white transition"
                                        >
                                            Statistics
                                        </Link>
                                        <Link
                                            to={`/${item.short_code}`}
                                            className="border-2 border-gray-800 rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-600 hover:text-white transition"
                                        >
                                            Visit
                                        </Link>
                                        <button
                                            onClick={() => setUrlToDelete(item)}
                                            className="border-2 border-red-600 text-red-600 rounded-md px-3 py-1 text-sm font-medium hover:bg-red-600 hover:text-white transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && urls.length > 0 && (
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300">
                            <button
                                onClick={() => fetchUrls(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="border-2 border-gray-800 rounded-md px-4 py-1 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-600 hover:text-white transition"
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {lastPage}
                            </span>

                            <button
                                onClick={() => fetchUrls(currentPage + 1)}
                                disabled={currentPage === lastPage}
                                className="border-2 border-gray-800 rounded-md px-4 py-1 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-600 hover:text-white transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* NEW: Confirmation modal */}
            {urlToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white border-2 border-gray-800 rounded-md p-6 w-80 shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Delete this URL?</h3>
                        <p className="text-sm text-gray-500 mb-6 truncate">
                            {window.location.origin}/{urlToDelete.short_code}
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setUrlToDelete(null)}
                                className="border-2 border-gray-800 rounded-md px-4 py-1 text-sm font-medium hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(urlToDelete.id)}
                                className="bg-red-600 text-white rounded-md px-4 py-1 text-sm font-medium hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyUrl;