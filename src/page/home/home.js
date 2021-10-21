
import Slide from './components/slide';
import SeriesMoved from './components/seriesmoved';
import OodMoved from './components/oodmoved';
import Anime from './components/anime';
import * as sentiment from './../../library/sentiment/sentiment';
const Home = () => {
    sentiment.sentimentText("phim siêu hay và kịch tính");
    return (
        <>
            <Slide />
            <SeriesMoved />
            <OodMoved />
            <Anime />
        </>
    );
}
export default Home;