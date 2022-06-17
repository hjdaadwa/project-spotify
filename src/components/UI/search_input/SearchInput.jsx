import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hook/useDebounce";

import { ReactComponent as ClearIcon } from "../../../assets/icons/clear.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg"
import './SearchInput.css'


/**
 * Возвращает компонет поиск. 
 * @param {Object} props - пропсы
 * @param {string} query - начальное состояние поиска. Передается, если через url перейти на стрицу поиска 
 * @returns {JSX.Element}
 */
function SearchInput({query}) {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState(query);
    const lastSearchValue = useDebounce(searchValue, 500); 

    useEffect(() => {
        navigate(`/search/${lastSearchValue}`);      
    }, [lastSearchValue]);

    function handleChange(event) {
        setSearchValue(event.target.value);
    }
    function clearInput() {
        setSearchValue('');
    }


    return (
        <div className="top-panel__search search">
            <form className="search__form" onSubmit={(e) => e.preventDefault()} role="search">
                <input className="search__input" value={searchValue} onChange={handleChange} type="text" placeholder="Author, track or album" maxLength="75"/>   
            </form>
            <div className="search__img-container">
                <SearchIcon className="search__img" />
            </div>
            <button className="search__clear-btn" onClick={clearInput}>
                {searchValue ? <ClearIcon className="search__clear-btn-img" /> : null}
            </button>
        </div>
    )
}

export default SearchInput;