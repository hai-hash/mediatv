import React from 'react';
import styles from './styles.module.scss';
import { MdAccountCircle } from "react-icons/md";
const ItemComment = ({ comment }) => {

    const caculatorTime = () => {
        var result = "";
        if (comment?.createBy) {
            let birthday = new Date(comment.createDate).getTime();
            let currenDay = new Date().getTime()
            let kc = parseInt(currenDay) - parseInt(birthday);
            var phut = Math.round(kc / 60000);
            var gio = Math.round(kc / 3600000);
            var ngay = Math.round(kc / 86400000);
            if (phut < 60) {
                result += "Khoảng " + phut + " phút trước";
            }
            if (gio < 24 && gio > 1) {
                result += "Khoảng " + gio + " giờ trước";
            }
            if (ngay > 1) {
                result += "Khoảng " + ngay + " ngày trước";
            }
        }
        else {
            result += "Ngay bây giờ";
        }
        return result;
    }
    return (
        <div className={styles.display_comment}>
            <div className={styles.avatar_comment_display}><MdAccountCircle size={40} color="#fff" /></div>
            <div className={styles.content_display}>
                <div className={styles.name_user}>{comment?.createBy}<span className={styles.time_comment}>{caculatorTime()}</span></div>
                <div className={styles.content_comment_display}>{comment?.contentComment}</div>
            </div>
        </div>
    )
}

export default ItemComment
