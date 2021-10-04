import React from 'react'

const ItemComment = ({ comment }) => {
    return (
        <tr>
            <th scope="row">{comment?.id}</th>
            <td>{comment?.contentComment}</td>
            <td>{comment?.account?.username}</td>
            <td>{comment?.film?.nameFilm}</td>
            <td>{comment?.createDate}</td>
        </tr>
    )
}

export default ItemComment
