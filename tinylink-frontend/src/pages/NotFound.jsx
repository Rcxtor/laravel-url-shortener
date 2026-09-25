import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[70vh]">
            <div className="flex flex-row items-center gap-6">
                <h1 className="text-8xl font-bold">ERROR <span className="text-red-600">404</span></h1>
            </div>
            <p className="text-4xl">This page doesn't exist.</p>
            {/* <Link className="mt-2 py-1 w-50 flex items-center justify-center border-2 border-gray-800 rounded-md font-bold text-gray-800 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg cursor-pointer" to={`/`}> Back to TinyLink Home </Link> */}
            <Link className="py-1 mt-2 w-50 flex items-center justify-center border-2 border-gray-800 rounded-md font-bold hover:text-gray-800 transition-all duration-300 bg-gray-800 hover:bg-gray-500 text-white hover:shadow-lg cursor-pointer" to={`/`}> Back to TinyLink Home </Link>

        </div>
    );
}
export default NotFound;