import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Oops!</h1>
            <div>
                Iky couldn't find that page.
            </div>
            <div>
                <Link to="/" className="btn btn-sm btn-primary">
                    Return Home
                </Link>
            </div>
        </div>
    );
};
export { Error404 };
