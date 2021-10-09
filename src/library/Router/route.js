import * as urls from './typeUrls'
import Home from '../../page/home/home'
import NotFound from './../../page/notfound/not'
import Introduct from '../../page/introduce'
import Firm from './../../page/firm/index'
import FilmByCategory from '../../page/category/category'
import FilmByCountry from '../../page/country/country'
import FilmByType from '../../page/type/type'
import SearchFilm from '../../page/search/search'
export const routes = [
    {
        path: urls.HOME,
        exact: true,
        content: () => <Home />
    },
    {
        path: urls.ANIME,
        exact: false,
        content: () => <Introduct />
    },
    {
        path: urls.FIRM,
        exact: false,
        content: () => <Firm />
    },
    {
        path: urls.CATEGORY,
        exact: false,
        content: () => <FilmByCategory />,
    },
    {
        path: urls.COUNTRY,
        exact: false,
        content: () => <FilmByCountry />,
    },
    {
        path: urls.TYPE,
        exact: false,
        content: () => <FilmByType />,
    },
    {
        path: urls.SEARCH,
        exact: false,
        content: () => <SearchFilm />,
    },
    {
        path: urls.NOT_FOUND,
        exact: false,
        content: () => <NotFound />,
    },


]