import { user } from "../components/user/user.js";

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
            'Authorization': 'Bearer ' + user.oAuth.accessToken,
        },
    })
}

/**
 * Функция-обертка для запроса к серверу приложения, для обновления токена доступа.
 * @returns {Promise}
 * @async
 */
async function refreshToken() {
    return fetch(`${baseMyServerURL}refresh_token?refresh_token=${user.oAuth.refreshToken}`);
        // .then(response => response.text().then(text => user.oAuth.setAccessToken(JSON.parse(text).access_token))).catch(err => console.log(err));

}

const API = {
    refreshToken: refreshToken,
    get: getFetch,
}
export default API;