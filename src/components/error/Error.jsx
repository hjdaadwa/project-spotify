import './Error.css';


/**
 * Возвращает компонент с отображением ошибки
 * @param {Object} props - компонент
 * @param {Object} props.error - объект ошибки 
 * @returns {JSX.Element}
 */
function Error({error}) {
    return (
        <article className='error'>
            <div className='error__content'>
                <h1 className='error__code'>{error.code}</h1>
                <h3 className='error__title'>{error.title}</h3>
                <p className='error__description'>{error.description}</p>
                <p className='error__solution'>{error.solution}</p>
            </div>
        </article>
    )
}

export default Error;