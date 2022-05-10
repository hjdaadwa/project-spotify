import OpenAuth2 from '../../api/authorization.js';
import userBtn from './user_btn.template';
import API from '../../api/api.js';

/**
 * Класс текущего юзера, + токены
 */
class User {
    data;
    oAuth;
    constructor() {
        this.oAuth = new OpenAuth2;
        this.createTemplate();
        this.renderTemplate();
    }

    createTemplate() {
        if (this.oAuth.accessToken) {
            this.template = document.createElement('div');
            this.template.classList.add('user');
            this.template.innerHTML = userBtn();
            this.img = this.template.querySelector('.user__img');
            this.img.hidden = true;
        } else {
            this.template = document.createElement('a');
            this.template.classList.add('authorization-btn');
            this.template.href = 'http://localhost:8888/login';
            this.template.ariaLabel = 'Authorization button';
            this.template.textContent = 'sign in';
        }
    }
    renderTemplate() {
        const wrapper = document.querySelector('.top-panel__authorization');
        wrapper.append(this.template);
    }
    updateData() {
        API.get('me').then((data) => {
            this.data = data;
            this.updateView();
        });
    }

    updateView() {
        this.img.src = this.data.images[0]?.url || this.data.images[1]?.url || this.data.images[2]?.url || 'https://i.ibb.co/51drLLx/default-user.png';
        this.img.hidden = false;
        this.template.querySelector('.user__name').textContent = this.data.display_name;
    }
}

let user;
const initUser = () => {
    user = new User();
    if (user.oAuth.accessToken) {
        user.updateData();
    }
}

export default initUser;
export {user};

