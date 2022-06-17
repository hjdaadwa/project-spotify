import LoginButton from "../components/UI/login_btn/LoginButton";

import './LoginPage.css'


/**
 * Компонент страницы авторизации. 
 * @returns {JSX.Element}
 */
function LoginPage() {
    return (
        <div className="login">
            <h1 className="login__title">You need to login to access this content</h1>
            <div className="login__btn-wrapper">
                <LoginButton />
                <span className="login__description">click here for authorization</span>
            </div>
        </div>
    )
}

export default LoginPage;