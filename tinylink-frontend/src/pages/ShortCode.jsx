import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { checkShortCode } from "../api/urlAPI";
import NotFound from "./NotFound";

function ShortCode() {
    const { shortCode } = useParams();
    const [status, setStatus] = useState("checking");

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
        return <p>Checking link...</p>;
    }

    return <NotFound />;
}

export default ShortCode;