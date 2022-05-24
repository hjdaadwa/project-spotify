import getRouter from './router/index.js';
import getUser from './components/user/user.js';
import initHandlers from './common/handlers.js';
import getUIcontroller from './common/UIController.js';
import getPlayer from './components/player/player.js';


/**
 * Создается объект класса User,
 * он в свою очередь вызывает конструктор класса oAuth,
 * который проверяет наличие токенов в local storage. 
 */
getUser();

/**
 * Создается объект класса Player, который отвечает за работу плеера.
 */
getPlayer();

/**
 * Создается объект класса ViewController, он отвечает за все вторичные элементы интерфейса.
 */
getUIcontroller();

/**
 * Вызывается функция, которая инициализирует работу роутера, используя History API,
 * чтобы веб-приложение работало как SPA без перезагрузок.
 */
getRouter();

/**
 * Обработчик/и
 */
initHandlers();