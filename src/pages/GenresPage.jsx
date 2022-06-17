import Error from "../components/error/Error";
import GenreCard from "../components/genre_card/GenreCard";
import Loader from "../components/UI/loader/Loader";

import useRequireAuth from "../hook/useRequireAuth";
import useQuery from "../hook/useQuery";
import API from "../services/api";

import { getRandomColorHex } from "../services/helpers";
import './GenresPage.css';


/**
 * Компонент страницы жанров
 * @returns {JSX.Element}
 */
function GenresPage() {
    useRequireAuth();
    const {response: genresData, error} = useQuery(API.get.bind(API), 'browse/categories?country=US&limit=28&offset=0');

    if (error) {
        <section className="genres-page">
            <Error error={error} />
        </section>
    }

    if (!genresData) {
        return (
            <section className="genres-page">
                <Loader />
            </section>
        )
    }

    const colors = genresData.categories.items.map(() => getRandomColorHex());
    return (
        <section className="genres-page">              
            <div className="genres-page__header">
                <h2 className="genres-page__title">Categories</h2>
            </div>
            <div className="genres-page__content">
                {
                    <>
                        {
                            genresData.categories.items.map((item, index) => {
                                return <GenreCard key={item.id} genreData={item} color={colors[index]} />
                            })
                        }
                    </>
                }
            </div>
        </section>
    )
}

export default GenresPage;