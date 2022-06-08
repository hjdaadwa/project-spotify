import { useContext } from "react";
import { useMatch } from "react-router-dom"
import AuthUserContext from "../../../contexts/auth/AuthUserContext";

import HistoryBtns from "../../UI/history_btns/HistoryBtns";
import LoginButton from "../../UI/login_btn/LoginButton";
import SearchInput from "../../UI/search_input/SearchInput";
import NavigationPanel from "../../UI/top_nav/NavigationPanel";
import User from "../../user/User";

import './topPanel.css';


/**
 * Компонент панели управления
 * @returns {JSX.Element}
 */
function TopPanel() {
    const searchMatch = useMatch('/search/*');
    const collectionMatch = useMatch('/collection/*');
    const {isAuth, user} = useContext(AuthUserContext);

    return (
        <section className="top-panel" aria-label="Upper panel and user menu">
            <div className="top-panel__control">
                <HistoryBtns/>
                <div className="top-panel__other">
                    {
                        searchMatch ? 
                            <SearchInput query={searchMatch.params['*']} /> : 
                            collectionMatch ? 
                                <NavigationPanel /> : 
                                null          
                    }
                </div>
            </div>
            <div className="top-panel__authorization">
                {
                    (isAuth && user) ? 
                        <User userData={user} /> : 
                        isAuth && !user ? 
                            <div></div> : 
                            <LoginButton />        
                }
            </div>
        </section>
    )
}

export default TopPanel;