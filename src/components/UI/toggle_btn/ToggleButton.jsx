/**
 * Кнопка переключения
 * @param {Object} props - пропсы
 * @param {function} toggleFn - callback
 * @param {children} - потомок
 * @returns {JSX.Element}
 */
function Toggle({toggleFn, children, ...props}) {
    return (
        <button onClick={toggleFn} {...props}>{children}</button>
    )
}

export default Toggle;