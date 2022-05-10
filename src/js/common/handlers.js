import constants from "./constans.js";
import API from "../api/api.js";


const initHandlers = () => {
    constants.main.addEventListener('scroll', () => {
        if (constants.main.scrollTop > 300) {
            constants.topPanel.style.backgroundColor = 'var(--bg-panel)';
        } else {
            constants.topPanel.style.backgroundColor = 'var(--bg-panel-o)';
        }
    });
}


export default initHandlers;