import OpenAuth2 from '../../api/authorization.js';
import userBtn from './user_btn.template';
import API from '../../api/api.js';
import { ApiError, errorHandler } from '../../common/Errors.js'

/**
 * Класс текущего юзера
 */
class User {

    /**
     * Создает элемент юзера или кнопки авторизации. Вызывает констурктор токена.
     */
    constructor() {
        this.oAuth = new OpenAuth2;
        this._createTemplate();
        this._renderTemplate();
    }

    /**
     * Создает темплейт или кнопку.
     * @private
     */
    _createTemplate() {
        if (this.oAuth.accessToken) {
            this.$template = document.createElement('div');
            this.$template.classList.add('user');
            this.$template.innerHTML = userBtn();
            this.$img = this.$template.querySelector('.user__img');
            this.$img.hidden = true;
        } else {
            this.$template = document.createElement('a');
            this.$template.classList.add('authorization-btn');
            this.$template.href = 'http://localhost:8888/login';
            this.$template.ariaLabel = 'Authorization button';
            this.$template.textContent = 'sign in';
        }
    }

    /**
     * Рендерит компонент
     * @private
     */
    _renderTemplate() {
        const $wrapper = document.querySelector('.top-panel__authorization');
        $wrapper.append(this.$template);
    }

    /**
     * Запрашивает данные о текущем юзере
     * @async
     * @public
     */
    async updateData() {
        try {
            const response = await API.get('me');
            if (!response.ok) {
                throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
            }
            this.data = await response.json();
            this._updateView();  
        } catch(err) {
            if (err instanceof ApiError) {
                errorHandler(err);
            } else {
                console.log(err);
            }
        }
    }

    /**
     * Обновляет представление
     * @private
     */
    _updateView() {
        this.$img.src = this.data.images[0]?.url || this.data.images[1]?.url || this.data.images[2]?.url || 'https://i.ibb.co/51drLLx/default-user.png';
        this.$img.hidden = false;
        this.$template.querySelector('.user__name').textContent = this.data.display_name;
    }
}

let user;

/**
 * Функция инициализации пользователя.
 */
const getUser = () => {
    if (!user) {
        user = new User();
        if (user.oAuth.accessToken) {
            user.updateData();
        }
    }
    return user;
}

export default getUser;