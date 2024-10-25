import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <>
            <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1>
            <div className="fw-semibold fs-6 text-gray-500 mb-7">
                Iky couldn't find that page.
            </div>
            <div className="mb-0">
                <Link to="/" className="btn btn-sm btn-primary">
                    Return Home
                </Link>
            </div>
        </>
    );
};
export { Error404 };
