import React from 'react';
import styles from './styles.module.scss';
import { MdAccountCircle } from "react-icons/md";
const ItemComment = ({ comment }) => {
    return (
        <div className={styles.display_comment}>
            <div className={styles.avatar_comment_display}><MdAccountCircle size={40} color="#fff" /></div>
            <div className={styles.content_display}>
                <div className={styles.name_user}>{comment?.createBy}</div>
                <div className={styles.content_comment_display}>{comment?.contentComment}</div>
            </div>
        </div>
    )
}

export default ItemComment
