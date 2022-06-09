<h1>Spotify clone react</h1>
<p>Для работы нужно авторизоваться, т.е. иметь аккаунт spotify.<br>
Также, чтобы получить токен при авторизации, мне нужно добавить ваш email адрес, привязанный к аккуануту spotify, в список доверенных для этого приложения.</p>
<p>Или, опять же, имея аккаунт, можно создать свое приложение на странице https://developer.spotify.com/dashboard и заменить client_id, client_secret в файле сервера server.js на свои.</p> 
<p>Прочел на вашем сайте в обсуждениях, что если кто-то делал приложение через авторизацию, с досутпом к личной библиотеке и возможностью редактировать что либо, то его приложение даже не открывают, а смотрят только код. Это грустно как-то, предлагаю вам дать свой аккаунт для проверок, я им все равно не пользуюсь. Напишите на почту: dv.zhirkov@gmail.com</p> 
Из сторонних библиотек используется:
<li><b>use-color-thief</b> - для получения преобладающего цвета в картинке, чтобы залить бэкграунд</li>

 <h3>Для проверки:</h3>
 <p>1. Установите зависимости</p>
 
```Bash
npm install
```
<p>2. Запустить прокси сервер для авторизации и хранения ключей в одном терминале. Запустить приложение в другом.</p>

Запусить локальный сервер
```Bash
node server
```


Запусить приложение
```Bash
npm start
```


<li>3. Открыть</li>
<b>http://localhost:3000/<b>

<h3>TODO</h3>
<p>Реализован фундамент, дальше буду добавлять функционал:</p>
<li>Плеер - done</li>
<li>Лайки</li>
<li>Пагинация с подгрузкой контента<li>
<li>Работа без авторизации</li>
<li>Всплывающее окно с ифнормацией о ошибке, предупреждениями или предложениями</li>
<li>Перенос на ts</li>
<li>Добавление, удаление, редактирование плейлистов</li>
<li>Личная страница с логаутом, редактированием информации</li>