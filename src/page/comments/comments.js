import React from 'react';
import styles from './styles.module.scss';
import ItemComment from './itemComment';
const Comments = () => {
    return (
        <div className={styles.wap_comment}>
            <div className={styles.count_comment}>
                0 Bình Luận
            </div>
            <div className={styles.comments}>
                <div className={styles.avatar_comment}>NVH</div>
                <div className={styles.input_comment}>
                    <form>
                        <input type="text" name="content_comment" placeholder="Nội dung bình luận" />
                        <button>Bình Luận</button>
                    </form>

                </div>
            </div>
            <ItemComment />
            <ItemComment />
            <ItemComment />
            <ItemComment />

        </div>
    )
}

export default Comments
