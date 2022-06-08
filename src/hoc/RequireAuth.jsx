import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthUserContext from '../contexts/auth/AuthUserContext';


/**
 * Обертка для компонентов, которые требуют авторизации. Пока висит на всех.
 * @param {Object} props
 * @param {JSX.Element} props.children - потомки  
 * @returns {JSX.Element}
 */
function RequireAuth({children}) {
    const {isAuth} = useContext(AuthUserContext);

    if (!isAuth) {
        return <Navigate to='/login' />
    }

    return children;
}

export default RequireAuth;