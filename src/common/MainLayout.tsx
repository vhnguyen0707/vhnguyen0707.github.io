import { Outlet } from "react-router-dom";
import Background from "./Background.tsx";
import NavBar from "../components/NavBar";
import {ScrollRestoration} from "react-router";
import {isMobile} from "react-device-detect";
import useWindowSize from "../hooks/useWindowSize";

export const LARGER_SCREEN_WIDTH = 1024; // Define a constant for larger screen width

export default function MainLayout({showNavBar}: {showNavBar?: boolean}) {
    const screenWidth = useWindowSize()[0];
    const showNavBarDefault = showNavBar || isMobile || screenWidth <= LARGER_SCREEN_WIDTH ; // Show NavBar by default on larger screens

    return <div className="main-layout">
        {/*<ScrollRestoration />*/}
        <Background />
        <div className="main-layout_content">
            {/* NAVBAR*/}
            {showNavBarDefault && <NavBar />}
            <div className="main-layout_content_inner">
                <Outlet />
            </div>
        </div>
    </div>
}