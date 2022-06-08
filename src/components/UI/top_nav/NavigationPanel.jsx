import { NavLink } from "react-router-dom";

import './NavigationPanel.css';


/**
 * Дополнительная панель навигации для My library
 * @returns {JSX.Element}
 */
function NavigationPanel() {
    const setActive = ({isActive}) => isActive ? "nav-panel__link_active" : "nav-panel__link";
    return (
        <nav className="nav-panel">
            <ul className="nav-panel__list">
                <li className="nav-panel__item">
                    <NavLink to="/collection/playlists" className={setActive}>Playlists</NavLink>
                </li>
                <li className="nav-panel__item">
                    <NavLink to="/collection/artists" className={setActive}>Artists</NavLink>
                </li>
                <li className="nav-panel__item">
                    <NavLink to="/collection/albums" className={setActive}>Albums</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationPanel;