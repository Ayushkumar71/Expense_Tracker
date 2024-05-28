import { Link, NavigateFunction, useNavigate, useRouteError } from "react-router-dom"

import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

const Error = () => {
    const error: any = useRouteError();
    const naviagte: NavigateFunction = useNavigate();
    return (
        // All well here
        <div className="error">
            <h1>Uh Oh!, We've got a problem</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button
                    className="btn btn--dark"
                    onClick={() => {
                        naviagte(-1)
                    }}>
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>
                <Link
                    to="/"
                    className="btn btn--dark">
                    <span>Go Home <HomeIcon width={20} /></span>
                </Link>
            </div>
        </div>
    )
}

export default Error