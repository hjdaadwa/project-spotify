import getRouter from "../router";
import API from "../api/api";
import getUser from "../components/user/user"
import constants from "./constans";


/**
 * Ошибка при работе с API
 */
export class ApiError extends Error {

    /**
     * @param {number} statusCode - статус HTTP ошибки
     * @param {string} message - сообщение
     * @param {string} url - на каком урле произошла
     */
    constructor(statusCode, message, url) {
        super(message);
        this.name = 'Spotify API error';
        this.statusCode = statusCode;
        this.redirectUrl = url;
    }
}


/**
 * Обрабатывает ошибки при работе с API
 * @param {ApiError} err - ошибка
 */
export const errorHandler = async (err) => {
    const $errorContainer = document.createElement('div');
    $errorContainer.classList.add('error__container');

    const $error = document.createElement('div');
    $error.classList.add('error');

    const $errorTitle = document.createElement('h1');
    $errorTitle.classList.add('error__title');

    const $errorDescription = document.createElement('p');
    $errorDescription.classList.add('error__description');

    const $errorRedirectContainer = document.createElement('div');

    const $errorRedirectName = document.createElement('span');
    $errorRedirectName.classList.add('error__redirect-name');

    const $errorRedirectLink = document.createElement('a');
    $errorRedirectLink.classList.add('error__redirect-link');

    $errorRedirectContainer.append($errorRedirectName, $errorRedirectLink);
    $error.append($errorTitle, $errorDescription, $errorRedirectContainer);
    $errorContainer.append($error);

    switch(err.statusCode) {
        case 400:
            $errorTitle.textContent = 'Bad Request';
            $errorDescription.textContent = `The request could not be understood by the server due to malformed syntax.`;

            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;
        case 401:
                const text = await API.refreshToken();
                getUser().oAuth.setAccessToken(JSON.parse(text).access_token);
                getUser().updateData();
                getRouter().goTo(err.redirectUrl);
                console.log(`Error "${err.statusCode},${err.name},${err.message}" was fixed`);
            break;
        case 403:
            $errorTitle.textContent = 'Bad OAuth Request';
            $errorDescription.textContent = `Unfortunately, re-authenticating the user won't help here. 
                                            Most likely your email is not added to the list of trusted`;
            $errorRedirectName.textContent = 'Send me your email address. dv.zhirkov@gmail.com';

            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;
            
        case 404:
            $errorTitle.textContent = 'Not Found';
            $errorDescription.textContent = 'This error can be due to a temporary or permanent condition.';
            $errorRedirectName.textContent = 'U can try again: ';
            $errorRedirectLink.href = err.redirectUrl;
            $errorRedirectLink.textContent = 'click here';

            getRouter().addLinkHandler($errorRedirectLink);

            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;
        case 429:
            $errorTitle.textContent = 'Too Many Request';
            $errorDescription.textContent = 'The app has exceeded its rate limits.';

            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;
        case 500:
            $errorTitle.textContent = 'Internal Server Error';
            $errorDescription.textContent = 'You should never receive this error.';

            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;
        case 502:
            $errorTitle.textContent = 'Bad Gateway';
            $errorDescription.textContent = 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.';

            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;
        case 503:
            $errorTitle.textContent = 'Service Unavailable';
            $errorDescription.textContent = 'The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.';
            
            constants.app.innerHTML = '';
            constants.app.append($errorContainer);
            break;            
    }
}