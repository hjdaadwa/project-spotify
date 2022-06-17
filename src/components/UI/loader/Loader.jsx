import './Loader.css';

/**
 * Индикатор загрузки данных
 * @param {Object} props - пропсы
 * @param {string} props.className - css класс
 * @returns 
 */
function Loader({className = 'loader'}) {
    return (
    <div className={className}>
        <div className='music'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </div>
    </div>
    )
}

export default Loader;