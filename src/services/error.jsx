/**
 * Ошибка при работе с API
 */
 export class ApiError extends Error {

    /**
     * @param {number} code- статус HTTP ошибки
     * @param {string} message - сообщение
     */
    constructor(code, message) {
        super(message);
        this.name = 'Spotify API Error';
        this.code = code;
        this.title = null;
        this.description = null;
        this.solution = null;

        switch(code) {
            case 400:
                this.title = 'Bad Request';
                this.description = 'The request could not be understood by the server due to malformed syntax.';
                break;
            case 403:
                this.title = 'Bad OAuth Request';
                this.description = `Unfortunately, re-authenticating the user won't help here. 
                                     Most likely your email is not added to the list of trusted`;
                this.solution = 'Send me your email address. dv.zhirkov@gmail.com';
                break
            case 404:
                this.title = 'Not Found';
                this.description = 'This error can be due to a temporary or permanent condition.';
                break;
            case 429:
                this.title = 'Too Many Request';
                this.description = 'The app has exceeded its rate limits.'
                this.solution = 'Reduce the number of requests to the server.'
                break;
            case 500:
                this.title = 'Internal Server Error';
                this.description = 'You should never receive this error.';
            break;
            case 502:
                this.title = 'Bad Gateway';
                this.description = 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.';
            break;
            case 503:
                this.title = 'Service Unavailable'
                this.description = `The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. 
                                    You can choose to resend the request again.`;
            break;
            default:
                this.title = 'Unknown error';
                this.description = `There's been an alien intervention`;
                this.solution = 'RUN';
        }     
    }
}