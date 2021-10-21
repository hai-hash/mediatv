import sentiment from 'sentiment';
var SentimentObject = new sentiment();
let data = require('./data.json');
// var vietnamese = {
//     labels: { 'hay': 5, 'love': 5 }
// };
// SentimentObject.registerLanguage('vi', vietnamese);

var options = {
    extras: data
};


export const sentimentText = (text) => {
    var docx = SentimentObject.analyze(text, options);
    console.log("đây là phân tích tình cảm : ", docx?.score)
    return docx?.score;
}