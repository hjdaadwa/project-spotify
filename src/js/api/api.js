import getUser from "../components/user/user.js";

const baseSpotifyURL = 'https://api.spotify.com/v1/';
const baseMyServerURL = 'http://localhost:8888/';

/**
 * Функция-обертка для запросов к API.
 * @param {string} url - запрос
 * @returns {Promise}
 * @async
 */
async function getFetch(url) {
    return fetch(`${baseSpotifyURL}${url}`, {
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getUser().oAuth.accessToken,
        },
    })
}

/**
 * Функция-обертка для запроса к серверу приложения, для обновления токена доступа.
 * @returns {Promise}
 * @async
 */
async function refreshToken() {
    return fetch(`${baseMyServerURL}refresh_token?refresh_token=${getUser().oAuth.refreshToken}`);
}

const API = {
    refreshToken: refreshToken,
    get: getFetch,
}
export default API;