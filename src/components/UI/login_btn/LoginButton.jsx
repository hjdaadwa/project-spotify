import './LoginButton.css'

/**
 * Кнопка авторизации
 * @returns {JSX.Element}
 */
function LoginButton() {
    return (
        <a className="authorization-btn" href="http://localhost:8888/login" aria-label="Authorization button">sign in</a>
    )
}

export default LoginButton;