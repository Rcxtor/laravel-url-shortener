import { useState } from "react";
import { useEffect } from "react";
import { createUrl } from "../api/urlAPI";
import RecentBox from "./RecentBox";

export default function UserBox()
{
    // for the input part
    const [shortCode, setShortCode] = useState("");
    const [url, setUrl] = useState("");

    // for the result part
    const [copied, setCopied] = useState(false);
    const [shortLink, setShortLink] = useState("");
    const [message, setMessage] = useState("");

    function handleCopy() {
        navigator.clipboard.writeText(shortLink);
        setCopied(true);
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await createUrl({
                url: url,
                short_code: shortCode|| undefined,
            });

            setMessage(response.data.message);
            console.log(shortCode);
            setShortLink(shortCode);
            setUrl("");
            setShortCode("");

        }catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to shorten URL"
            );
        }
    }

    return(
        <div className="border-2 rounded-md flex mt-20 w-2xl divide-x-2">
            <div className="flex flex-col items-center w-full py-10" >
                <div className="flex flex-col items-center">

                    <h1>Get TinyLink Code</h1>

                    <form className="flex flex-col items-center gap-5 w-full"  onSubmit={handleSubmit}>
                        <div className="flex gap-2">
                        <input className=" mt-4 w-80 border-2 rounded-md text-center py-1 px-2 focus:outline-none focus:border-gray-500 transition-colors" type="text" placeholder="https://example.com/very/long/url" value={url} onChange={(event) => setUrl(event.target.value)} />
                        <input className=" mt-4 w-20 border-2 rounded-md text-center py-1 px-2 focus:outline-none focus:border-gray-500 transition-colors" type="text" placeholder="Code" value={shortCode} onChange={(event) => setShortCode(event.target.value)} />

                        </div>
                        <span className="-mt-4">{message}</span>
                        <button  className="font-bold border-2 border-gray-800 rounded-md px-2 text-sm py-1 bg-gray-800 text-white hover:bg-gray-400 hover:border-gray-800 hover:text-gray-800 transition-all duration-300 mb-6" type="submit">
                            Shorten
                        </button>
                    </form>


                </div>
                <div className="flex flex-col w-[50%] items-center"> {/*result */}

                    <h2 className="mr-auto font-bold">Your Shorten Link</h2>
                    <div className="flex gap-2 mt-1 w-full">
                        <span className="border-2 w-full rounded-md h-7 px-2">{shortLink}</span>
                        <button className="border-2 text-xs px-2 rounded-md" onClick={handleCopy}> {copied ? "Copied!" : "Copy"} </button>
                    </div>

                </div>
                <hr className="w-full border-[1px] mt-4 mb-2" />
                {/*resents */}

                <RecentBox/>
                
                
            </div>
        </div>
    )
}