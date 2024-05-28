// rrd imports
import { FetcherWithComponents, useFetcher } from "react-router-dom"

// assets
import illustration from "../assets/illustration.jpg"

// library 
import { UserPlusIcon } from "@heroicons/react/24/solid"

const Intro = () => {
    const fetcher = useFetcher<FetcherWithComponents<HTMLFormElement>>();
    const isSubmitting = fetcher.state === "submitting";
    return (
        <div>
            <div>
                <h1>
                    Take control of <span className="accent">Your money</span>
                </h1>
                <br />
                <p>
                    Personal budgeting is the secret to financial freedom.
                    Start your journey today.
                </p>
                <br />
                <fetcher.Form method="post">
                    <input
                        type="text"
                        name="userName"
                        required placeholder="Enter your Name"
                        aria-label="Your Name"
                        autoComplete="given-name" />
                    <input type="hidden" name="_action" value="newUser" />
                    <br />
                    <br />
                    <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </fetcher.Form>
            </div>
            <img src={illustration} alt="Person with money" width={600} />
        </div>
    )
}

export default Intro