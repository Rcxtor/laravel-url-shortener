import { useState } from "react";
import { Link } from "react-router-dom";
import { createGuestUrl } from "../api/urlAPI";

export default function GuestBox(){
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [shortLink, setShortLink] = useState("");
    const [message, setMessage] = useState("");

    function handleCopy() {
        navigator.clipboard.writeText(shortLink);
        setCopied(true);
    }

    async function handleGuestSubmit(event) {
        event.preventDefault();

        try {
            const response = await createGuestUrl({
                url: url,
            });
            
            // setShortLink(response.data.data.short_code);
            setShortLink(`${window.location.origin}/${response.data.data.short_code}`);

            setMessage(response.data.message);
            setUrl("");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to shorten URL"
            );
        }
    }

    return(
        <div className="border-2 rounded-md flex flex-row mt-20 w-2xl divide-x-2">  {/* main container*/}
            
                {/* options  */}
                <div className="flex flex-col items-center w-[60%] py-10" > {/* guest */}
                    <div className="flex flex-col items-center"> {/*input */}

                        <h1>Get TinyLink Code</h1>

                        <form className="flex flex-col items-center gap-5 w-full" onSubmit={handleGuestSubmit} >
                            <input className=" mt-4 w-full border-2 rounded-md text-center py-1 px-2 focus:outline-none focus:border-gray-500 transition-colors" type="text" placeholder="https://example.com/very/long/url" value={url} onChange={(event) => setUrl(event.target.value)} />
                            <span className="-mt-4">{message}</span>
                            <button  className="font-bold border-2 border-gray-800 rounded-md px-2 text-sm py-1 bg-gray-800 text-white hover:bg-gray-400 hover:border-gray-800 hover:text-gray-800 transition-all duration-300 mb-6" type="submit">
                                Shorten
                            </button>
                        </form>
{/* need to change the you shorten url */}
                        <p className="text-sm text-gray-500">No account required for quick links.</p>
                        <p className="text-sm text-gray-500">Guest links: 5 clicks</p>

                    </div>
                    <hr className="w-full border-[1px] mt-4 mb-2" />
                    <div className="flex flex-col w-[70%] items-center"> {/*result */}

                        <h2 className="mr-auto font-bold">Your Shorten Link</h2>
                        <div className="flex gap-2 mt-1 w-full">
                            <span className="border-2 w-full rounded-md h-7 px-2">{shortLink}</span>
                            <button className="border-2 text-xs px-2 rounded-md" onClick={handleCopy}> {copied ? "Copied!" : "Copy"} </button>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col items-center w-[40%] py-10"> {/* login */}
                    <h1>Create Account</h1>
                    <ul className="list-disc list-inside space-y-1 text-gray-800 marker:text-gray-500 mt-2 mb-8 text-left">
                        <li>Custom Code</li>
                        <li>Unlimited Visit</li>
                        <li>Manage URL</li>
                        <li>See Statistics</li>
                    </ul>
                    
                    <Link className="py-1 w-50 flex items-center justify-center border-2 border-gray-800 rounded-md font-bold hover:text-gray-800 transition-all duration-300 bg-gray-800 hover:bg-gray-500 text-white hover:shadow-lg cursor-pointer" to={`/login`}> Log In </Link>
                    <p className="text-gray-500 text-xs pt-2">OR</p>
                    <Link className="mt-2 py-1 w-50 flex items-center justify-center border-2 border-gray-800 rounded-md font-bold text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg cursor-pointer" to={`/register`}> Sign Up </Link>
                            
                        
                </div>

                
            </div>
    )
}