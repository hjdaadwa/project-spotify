import getUser from "../components/user/user.js";
import { ApiError, errorHandler } from "../common/Errors.js";

const baseSpotifyURL = 'https://api.spotify.com/v1/';
const baseMyServerURL = 'http://localhost:8888/';

/**
 * Функция-обертка для запросов к API.
 * @param {string} url - запрос
 * @returns {Promise} - промис с оъектом данных или вызывает обработку ошибок
 * @async
 */
async function getFetch(url) {
    try {
        const response = await fetch(`${baseSpotifyURL}${url}`, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getUser().oAuth.accessToken,
            },
        });
        if (!response.ok) {
            throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);
        }
        const data = await response.json();
        return data;
    } catch(err) {
        if (err instanceof ApiError) {
            errorHandler(err);
        } else {
            console.log(err);
        }
    }
}


/**
 * Функция-обертка для запроса к серверу приложения, для обновления токена доступа.
 * @returns {Promise} Примис с новым токеном
 * @async
 */
async function refreshToken() {
    try {
        const response = await fetch(`${baseMyServerURL}refresh_token?refresh_token=${getUser().oAuth.refreshToken}`);
        if (!response.ok) {
            throw new ApiError(response.status, `Error while updating token"`, window.location.pathname);
        }
        const text = response.text();
        return text;
    } catch(err) {
        if (err instanceof ApiError) {
            errorHandler(err);
        } else {
            console.log(err);
        }
    }
}

const API = {
    refreshToken: refreshToken,
    get: getFetch,
}
export default API;