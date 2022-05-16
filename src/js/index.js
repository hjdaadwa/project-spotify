import initRouter from './router/index.js';
import initUser from './components/user/user.js';
import initHandlers from './common/handlers.js';
import initUIController from './common/UIController.js';
import initPlayer from './components/player/player.js';
// import API from './api/api.js'

/**
 * Создается объект класса User,
 * он в свою очередь вызывает конструктор класса oAuth,
 * который проверяет наличие токенов в local storage. 
 */
initUser();

/**
 * Создается объект класса Player, который отвечает за работу плеера.
 */
initPlayer();

/**
 * Создается объект класса ViewController, он отвечает за все вторичные элементы интерфейса.
 */
initUIController();

/**
 * Вызывается функция, которая инициализирует работу роутера, используя History API,
 * чтобы веб-приложение работало как SPA без перезагрузок.
 */
initRouter();

/**
 * Обработчик/и
 */
initHandlers();