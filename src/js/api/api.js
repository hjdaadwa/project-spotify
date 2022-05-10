import { user } from "../components/user/user.js";

const baseUrl = 'https://api.spotify.com/v1/';

const baseFetch = (url) => {
    return new Promise((resolve, reject) => {
        try{
            const _config = {
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.oAuth.accessToken,
                }, 
            }
            window.fetch(`${baseUrl}${url}`, {
                ..._config
            }).then(response=>response.json())
            .then(resolve, reject)
        } catch(e){
            reject(e);
        }
    }).catch(err => console.log(err ,'todo'));
}

const refreshToken = () => {
    return fetch(`http://localhost:8888/refresh_token?refresh_token=${user.oAuth.refreshToken}`)
        .then(response => response.text().then(text => user.oAuth.setAccessToken(JSON.parse(text).access_token))).catch(err => console.log(err));

}
const fetchGet = (url) => {
    return baseFetch(url);
}

const API = {
    get: fetchGet,
    refreshToken: refreshToken,
}
export default API;