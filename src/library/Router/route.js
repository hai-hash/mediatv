import * as urls from './typeUrls'
import Home from '../../page/home/home'
import NotFound from './../../page/notfound/not'
import Introduct from '../../page/introduce'
import Firm from './../../page/firm/index'

export const routes = [
    {
        path : urls.HOME,
        exact: true,
        content: () => <Home/>
    },
    {
        path : urls.ANIME,
        exact: false,
        content: () => <Introduct/>
    },
    {
        path : urls.FIRM,
        exact: false,
        content: () => <Firm/>
    },
    {
        path : urls.NOT_FOUND,
        exact: false,
        content: () => <NotFound/>,
    },
   
   
]