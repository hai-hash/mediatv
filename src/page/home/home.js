
import Slide from './components/slide';
import SeriesMoved from './components/seriesmoved';
import OodMoved from './components/oodmoved';
import Anime from './components/anime';
// var sentiment = require('sentiment');
// var SentimentObject = new sentiment();
// var docx = SentimentObject.analyze("it is very good, i am very happy");
// console.log("đây là phân tích tình cảm : ",docx)

const Home = () =>{
    return (
        <>
        <Slide/>
        <SeriesMoved/>
        <OodMoved/>
        <Anime/>
        </>
    );
}
export default Home;