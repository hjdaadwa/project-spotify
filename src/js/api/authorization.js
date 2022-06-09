/**
 * Работа с токенами доступа spotifyAPI
 */
export default class OpenAuth2 {
    /**
     * При загрузке страницы проверяет наличие сохраненных токенов в localStorage
     * При налачии токенов в редиректнутой странице, получает их.
     */
    constructor() {
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
        if (window.location.hash) {
            this.authorization();
        }
    };

    /**
     * Присвоить переданный токен доступа и сохранить в хранилище
     * @param {*} accessToken - токен доступа
     */
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
    }

    /**
     * Присвоить переданный токен обновления и сохранить в хранилище
     * @param {*} accessToken - токен обновления
     */
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
        localStorage.setItem('refreshToken', refreshToken);
    }

    /**
     * Забирает токены с хэша урла при редиректе с спотифай авторизации.
     */
    authorization() {
        const hashParams = {};
        const regExp = /([^&;=]+)=?([^&;]*)/g;
        let e;
        let q = window.location.hash.substring(1);
        while (e = regExp.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        this.setAccessToken(hashParams.access_token);
        this.setRefreshToken(hashParams.refresh_token);
        window.location = window.location.href.split('#')[0];
    }
}
