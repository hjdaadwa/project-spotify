import './User.css'


/**
 * Возвращает компонент юзер
 * @param {Object} props
 * @param {Object} props.userData - данные пользователя
 * @param {string} props.userData.name - имя пользователя
 * @param {Object[]} [props.userData.images] - массив аватарок
 * @param {string} [props.userData.images[].url] - адрес аватарки
 * @returns {JSX.Element}
 */
function User({userData : {name, images}}) {
    const imgSrc = images[0]?.url || images[1]?.url || images[2]?.url || 'https://i.ibb.co/51drLLx/default-user.png';
    return(
        <div className="user">
            <div className="user__img-container">
                <img className="user__img" src={imgSrc} alt="User avatar" width="28" height="28" />
            </div>
            <span className="user__name">{name}</span>
        </div>
    )
}

export default User;