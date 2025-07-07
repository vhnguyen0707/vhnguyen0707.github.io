import { Outlet } from "react-router-dom";
import Background from "./Background.tsx";
import NavBar from "../components/NavBar.tsx";
import {ScrollRestoration} from "react-router";



export default function MainLayout({showNavBar}: {showNavBar?: boolean}) {
    return <div className="main-layout">
        {/*<ScrollRestoration />*/}
        <Background />
        <div className="main-layout_content">
            {/* NAVBAR*/}
            {showNavBar && <NavBar />}
            <div className="main-layout_content_inner">
                <Outlet />
            </div>
        </div>
    </div>
}