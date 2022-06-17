import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthUserContext from "../contexts/auth/AuthUserContext";

function useRequireAuth() {
    const {isAuth} = useContext(AuthUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth]);
}

export default useRequireAuth;