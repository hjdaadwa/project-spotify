import Logotype from "../../UI/Logotype/Logotype";
import Navigation from "../../UI/main_nav/Navigation";

import './Header.css'


/**
 * Компонент шапки
 * @returns  {JSX.Element}
 */
function Header() {

return (
    <header className="header" aria-label="Left panel and main menu">
        <Logotype/>
        <Navigation/>
    </header>
)
}

export default Header;