import React from 'react'
import * as sentiment from './../../library/sentiment/sentiment';
import { BiHappyAlt, BiSad } from 'react-icons/bi';
import { RiEmotionNormalLine } from 'react-icons/ri';
const ItemComment = ({ comment }) => {
    const displaySentiment = (contentComment) => {
        const score = sentiment.sentimentText(contentComment);
        if (score > 0) return <BiHappyAlt style={{ color: 'green' }} />
        else if (score < 0) return <BiSad style={{ color: 'red' }} />
        else return <RiEmotionNormalLine style={{ color: 'blue' }} />
    }
    return (
        <tr>
            <th scope="row">{comment?.id}</th>
            <td>{comment?.contentComment}</td>
            <td>{displaySentiment(comment?.contentComment)}</td>
            <td>{comment?.account?.username}</td>
            <td>{comment?.film?.nameFilm}</td>
            <td>{comment?.createDate}</td>
        </tr>
    )
}

export default ItemComment
