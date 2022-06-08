import { useState, useEffect } from "react";

import API from "../../services/api";
import { ApiError } from "../../services/error";
import AuthUserContext from "./AuthUserContext";


/**
 * Провайдер контекста авторизации юзера. Возвращает 2 состояния: isAuth - состояние авторизации,
 * user - данные авторизованного юзера.
 * @param {Object} props - пропсы
 * @param {JSX.Element} props.children - компоненты потомки 
 * @returns {JSX.Element}
 */
function AuthUserProvider({children}) {
    function initAuthState() {
        if (window.location.hash) {
            API.parseTokens();
        }
        if (localStorage.getItem('accessToken')) {
            return true;
        } else {
            return false;      
        }
    }
    const [isAuth, setIsAuth] = useState(initAuthState);
    const [user, setUser] = useState(null);
    // ОШИБКИ

    useEffect(async () => {

        async function getUserInfo() {
            try {
                const response = await API.get('me');

                if (response.status === 401) {
                    const result = await API.refreshToken();
                    if (result.ok) {
                        response = await API.get('me');
                    } else {
                        throw new ApiError(0, result.error);
                    }
                }

                if (!response.ok) {
                    throw new ApiError(response.status, 'Critical error. Failed to get authorized user data. Try clearing the cache and reloading the page');
                }
                
                const json = await response.json();
                return json;

            } catch(error) {
                
                console.log(error)
                return null;
            }
        }
        if (isAuth) {
            const userData = await getUserInfo();
            
            if (userData) {
                const {id, display_name: name, email, images} = userData;
                setUser({id, name, email, images});
            } else {
                setUser(null);
                setIsAuth(false);
                localStorage.setItem('accessToken', '');
                localStorage.setItem('refreshToken', '');
            }
        } else {
            setUser(null);
            localStorage.setItem('accessToken', '');
            localStorage.setItem('refreshToken', '');
        }

    }, [isAuth]);

    return (
        <AuthUserContext.Provider value={{isAuth, user}}>{children}</AuthUserContext.Provider>
    );
}

export default AuthUserProvider;