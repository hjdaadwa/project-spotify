export default class OpenAuth2 {
    error = undefined;

    constructor() {
        this._accessToken = sessionStorage.getItem('accessToken');
        this._refreshToken = sessionStorage.getItem('refreshToken');
        if (window.location.hash) {
            this.authorization();
        }
    };

    get accessToken() {
        return this._accessToken;
    };
    get refreshToken() {
        return this._refreshToken;
    };
    set accessToken(accessHash) {
        this._accessToken = accessHash;
    };
    set refreshToken(refreshHash) {
        this._refreshToken = refreshHash;
    };

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        sessionStorage.setItem('accessToken', accessToken);
    }
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
        sessionStorage.setItem('refreshToken', refreshToken);
    }
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
        this.error = hashParams.error;
        window.location = window.location.href.split('#')[0];
    }
}
