// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// helper functions
import { fetchData } from "../helpers/HelperFun";
import { userNameToken } from "../helpers/HelpersTypes";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// loader
export function MainLoader() {
    const userName = fetchData("userName")
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData() as userNameToken;
    return (
        <div className="layout">
            <Nav userName={userName} />
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    )
}


export default Main
