import initRouter from './router/index.js';
import initUser, { user } from './components/user/user.js';
import initHandlers from './common/handlers.js';
import initViewController from './components/default/top_panel_other.js';
import initPlayer from './components/player/player.js';
import API from './api/api.js'

/**
 * Создается объект класса User,
 * он в свою очередь вызывает конструктор класса oAuth,
 * который проверяет наличие токенов в session storage.
 * С session удобно тестить кейсы. 
 */
initUser();

/**
 * Создается объект класса Player, который отвечает за работу плеера.
 */
initPlayer();

/**
 * Создается объект класса ViewController, он отвечает за все вторичные элементы интерфейса.
 */
initViewController();

/**
 * Вызывается функция, которая инициализирует работу роутера, используя History API,
 * чтобы веб-приложение работало как SPA без перезагрузок.
 * setTimeout, чтобы дать время usery сделать запросы и присвоить данные.
 */
setTimeout(initRouter, 550);

/**
 * Обработчик/и
 */
setTimeout(initHandlers, 560);

/**
 * Обновление токена доступа
 */
setInterval(API.refreshToken, 180000);