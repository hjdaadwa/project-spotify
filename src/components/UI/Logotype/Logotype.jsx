import { Link } from "react-router-dom";

import './Logotype.css'


/**
 * Логотип
 * @returns {JSX.Element}
 */
function Logotype() {
    return (
        <Link className="header__logo-link" to="/">
            <img className="header__logo-img" src="/img/Spotify_logo.svg" alt="The spotify logotype" width="131" height="40"/>
        </Link>
    )
}

export default Logotype;