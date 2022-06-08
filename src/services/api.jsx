import { ApiError } from "./error";


/**
 * Класс с методами для работы с апи спотифай и прокси сервером авторизации, где хранятся ключи приложения.
 */
class API {
    static #baseSpotifyURL = 'https://api.spotify.com/v1/';
    static #baseAuthURL = 'http://localhost:8888/';
    static #baseHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',    
    };

    static async #baseFetch(url, config, signal) {
        config.headers = {
            ...this.#baseHeaders, 
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        };
        if (signal) {
            config.signal = signal
        }
        return fetch(url, config);
    }

    static get(url, signal) { 
        const config = {
            method: 'GET',
        }
        return this.#baseFetch(`${this.#baseSpotifyURL}${url}`, config, signal)
    }

    static post() {

    }

    static async refreshToken() {
        try {
            const response = await fetch(`${this.#baseAuthURL}refresh_token?refresh_token=${localStorage.getItem('refreshToken')}`);
            if (!response.ok) {
                throw new ApiError(
                    0,
                    'Critical error. Failed to get authorized user data. Try clearing the cache and reloading the page. Check internet'
                );
            }
            const text = await response.text();
            const accessToken = await JSON.parse(text).access_token;
            localStorage.setItem('accessToken', accessToken);
            console.log(`Access token was updated`);

            return {ok: true, message: `Access token was update`};
        } catch(error) {
            return {ok: false, error};
        }
    }

    static parseTokens() {
        const hashParams = {};
        const regExp = /([^&;=]+)=?([^&;]*)/g;
        let e;
        let q = window.location.hash.substring(1);
        while (e = regExp.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        localStorage.setItem('accessToken', hashParams.access_token);
        localStorage.setItem('refreshToken', hashParams.refresh_token);
        window.location = window.location.href.split('#')[0];
    }
}

export default API;