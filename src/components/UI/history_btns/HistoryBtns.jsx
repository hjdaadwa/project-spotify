import { useNavigate } from 'react-router-dom'

import { ReactComponent as SvgBackArrow } from "../../../assets/icons/back.svg";
import { ReactComponent as SvgForwardArrow } from "../../../assets/icons/forward.svg";
import './HistoryBtns.css';


/**
 * Кнопки работы с историей
 * @returns {JSX.Element}
 */
function HistoryBtns() {
    const navigate = useNavigate();

    return (
        <div className="top-panel__control-btns">
            <button className="top-panel__control-btn" onClick={() => navigate(-1)} aria-label="Back">
                <SvgBackArrow className="top-panel__control-img" />
            </button>
            <button className="top-panel__control-btn" onClick={() => navigate(+1)} aria-label="Forward">
                <SvgForwardArrow className="top-panel__control-img" />
            </button>
        </div>
    )
}

export default HistoryBtns;