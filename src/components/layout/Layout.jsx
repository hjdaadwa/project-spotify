import { Outlet } from "react-router-dom";

import Player from "../player/Player";
import Header from "./header/Header";
import TopPanel from "./top_panel/TopPanel";

import './Layout.css'


/**
 * Основная разметка приложения
 * @returns {JSX.Element}
 */
function Layout() {
   return (
       <>
        <Header />
        <main className="main">
            <TopPanel/>
            <section className="main-container">
                <Outlet />
            </section>
        </main>
        <Player />
       </>
   ) 
}

export default Layout;