import { NavLink, useMatch } from "react-router-dom";

import { ReactComponent as SvgHome} from "../../../assets/icons/home.svg";
import { ReactComponent as SvgSearch} from "../../../assets/icons/search.svg";
import { ReactComponent as SvgCollection} from "../../../assets/icons/collection.svg";
import { ReactComponent as SvgFavorite} from "../../../assets/icons/favorite.svg";
import './Navigation.css';


/**
 * Компонент основной навигации.
 * @returns {JSX.Element}
 */
function Navigation() {
    const match = useMatch('/collection/:path');
    const setActive = ({isActive}) => isActive ? "header__navigation-link_active" : "header__navigation-link";

    return (
        <nav className="header__navigation">
            <ul className="header__navigation-list">
                <li className="header__navigation-item">
                    <NavLink 
                        className={setActive} 
                        to="/"
                    >
                        <SvgHome className="header__navigation-icon" />
                        <span className="header__navigation-text">Home</span>
                    </NavLink>
                </li>

                <li className="header__navigation-item">
                    <NavLink 
                        className={setActive} 
                        to="/search"
                    >
                        <SvgSearch className="header__navigation-icon" />
                        <span className="header__navigation-text">Search</span>
                    </NavLink>
                </li>

                <li className="header__navigation-item">
                    <NavLink 
                        className={() => match ? "header__navigation-link_active" : "header__navigation-link"} 
                        to="/collection/playlists"
                    >
                        <SvgCollection className="header__navigation-icon" />
                        <span className="header__navigation-text">My library</span>
                    </NavLink>
                </li>
                
                <li className="header__navigation-item">
                    <NavLink 
                        className={setActive} 
                        to="/playlist/me"
                    >
                        <SvgFavorite className="header__navigation-icon" />
                        <span className="header__navigation-text">Favorites</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;