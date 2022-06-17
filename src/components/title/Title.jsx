import './Title.css'

/**
 * Возвращает тайтл с корректным размером шрифта
 * @param {Object} props - пропсы
 * @param {string} className - css класс 
 * @param {JSX.Element} children - компонент потомок
 * @returns {JSX.Element}
 */
function Title({children, className, ...props}) {
    let newClassName;
    if (children.length >= 50) {
        newClassName = `title_size_small`;
    } else if (children.length >= 35) {
        newClassName = `title_size_normal`; 
    } else if (children.length >= 20) {
        newClassName = `title_size_large`;
    } else if (children.length < 20) {
        newClassName = className;
    }

    return (
        <h1 className={newClassName} {...props}>{children}</h1>
    )
}

export default Title;