import React from 'react';
import styles from './styles.module.scss';
import { MdAccountCircle } from "react-icons/md";
const ItemComment = () => {
    return (
        <div className={styles.display_comment}>
            <div className={styles.avatar_comment_display}><MdAccountCircle size={40} /></div>
            <div className={styles.content_display}>
                <div className={styles.name_user}>Nguyễn Văn Hải</div>
                <div className={styles.content_comment_display}>Phim rất hay và này nọ, tôi rất thích nó</div>
            </div>
        </div>
    )
}

export default ItemComment
