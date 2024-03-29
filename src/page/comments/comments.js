import React from 'react';
import styles from './styles.module.scss';
import ItemComment from './itemComment';
import { useState, useContext, useEffect } from 'react';
import { PublicContext } from '../../publicContexts/contexts';
import commentUserApi from '../../api/comment/commentApi';
import * as toasts from './../../library/toast/toast';
import * as sentiment from './../../library/sentiment/sentiment';
import filmApi from '../../api/film/filmApi';
import Picker from 'emoji-picker-react';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';



const Comments = ({ id }) => {
    const { infoAccount } = useContext(PublicContext);

    const [countComment, setCountComment] = useState(0);

    const [listComments, setListComments] = useState([]);

    const [comment, setComment] = useState({ createBy: infoAccount?.fullName ? infoAccount?.fullName : "", contentComment: "", createDate: null });

    const [sizePage, setSizePage] = useState(4);

    const [chosenEmoji, setChosenEmoji] = useState(null);

    const [activeEmoji, setActiveEmoji] = useState(false);


    useEffect(() => {
        setCountComment(listComments.length);
    }, [listComments])

    useEffect(() => {
        if (chosenEmoji) {
            let newComment = comment?.contentComment + chosenEmoji?.emoji;
            setComment({ ...comment, contentComment: newComment });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenEmoji])
    useEffect(() => {
        setSizePage(4);
        const getAllCommentByFilm = async () => {
            try {
                const params = {
                    size: sizePage,
                    page: 0,
                }
                const res = await commentUserApi.getAllCommentByFilm(id, params);
                setListComments(res);
            } catch (error) {
                console.log(error);
            }
        }
        getAllCommentByFilm();
        setComment({ ...comment, contentComment: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        const getAllCommentByFilm = async () => {
            try {
                const params = {
                    size: sizePage,
                    page: 0,
                }
                const res = await commentUserApi.getAllCommentByFilm(id, params);
                setListComments(res);
            } catch (error) {
                console.log(error);
            }
        }
        getAllCommentByFilm();
        setComment({ ...comment, contentComment: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sizePage])


    const DisplayElementComment = (comments) => {
        var result = null;
        if (comments.length > 0) {
            result = comments.map((comment, index) => {

                return <ItemComment key={index} comment={comment} />
            })
        }
        return result;
    }


    const onAddComment = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setComment({ ...comment, [name]: value, createDate: new Date() });

    }

    useEffect(() => {
        console.log(comment);
    }, [comment])


    // const onComment = (e) => {
    //     e.preventDefault();
    //     var token = localStorage.getItem("token");
    //     if (token) {
    //         var new_comments = [...listComments];
    //         new_comments.unshift(comment);
    //         setCountComment(countComment + 1);
    //         setListComments(new_comments);
    //         const SubmitComment = async () => {
    //             try {
    //                 const res = await commentUserApi.post(comment, id, infoAccount?.username ? infoAccount?.username : "");
    //                 console.log(res);
    //                 toasts.notifyInfo("Bình luận đã được ghi lại !.");
    //                 const score = sentiment.sentimentText(comment?.contentComment);
    //                 const updateCore = async () => {
    //                     try {
    //                         const respon = await filmApi.updateScore(id, score);
    //                         console.log(respon);
    //                     } catch (error) {
    //                         console.log(error);
    //                     }
    //                 }
    //                 updateCore();
    //                 setComment({ ...comment, contentComment: "" });
    //             } catch (error) {
    //                 console.log(error);
    //                 toasts.notifyError("Bình luận thất bại !.");
    //             }
    //         }
    //         SubmitComment();
    //     }
    //     else {
    //         alert("Bạn cần đăng nhập để thực hiện bình luận !");
    //     }

    // }


    const getName = (name) => {
        var result = "";
        if (name !== null) {
            var arr_name = name?.split(" ");
            if (arr_name) {
                if (arr_name.length < 4) {
                    for (name of arr_name) {
                        result += name.charAt(0).toUpperCase();
                    }
                }
                else {
                    result += arr_name[0].charAt(0).toUpperCase() + arr_name[arr_name.length - 1].charAt(0).toUpperCase();
                }
            }
        }
        return result;
    }
    const onViewMore = () => {
        setSizePage(sizePage + 2);
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const onActiveEmoji = () => {
        setActiveEmoji(!activeEmoji);
    }
    const sendComment = () => {
        var token = localStorage.getItem("token");
        if (token) {

            const SubmitComment = async () => {
                try {
                    const res = await commentUserApi.post(comment, id, infoAccount?.username ? infoAccount?.username : "");
                    console.log(res);
                    toasts.notifyInfo("Bình luận đã được ghi lại !.");
                    const score = sentiment.sentimentText(comment?.contentComment);
                    const updateCore = async () => {
                        try {
                            const respon = await filmApi.updateScore(id, score);
                            console.log(respon);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    updateCore();
                    setComment({ ...comment, contentComment: "" });
                } catch (error) {
                    console.log(error);
                    toasts.notifyError("Bình luận thất bại !.");
                }
            }
            if (comment?.contentComment !== "") {
                var new_comments = [...listComments];
                new_comments.unshift(comment);
                setCountComment(countComment + 1);
                setListComments(new_comments);
                SubmitComment();
            }
            else {
                toasts.notifyError("bạn không thể bình luận với nội dung trống");
            }

        }
        else {
            alert("Bạn cần đăng nhập để thực hiện bình luận !");
        }
    }

    return (
        <div className={styles.wap_comment}>
            <div className={styles.count_comment}>
                {countComment} Bình Luận
            </div>
            <div className={styles.comments}>
                <div className={styles.avatar_comment}>{getName(infoAccount?.fullName ? infoAccount?.fullName : "người dùng")}</div>
                <div className={styles.input_comment}>
                    <form autoComplete="off">
                        <input type="text" name="contentComment" value={comment?.contentComment} placeholder="Nội dung bình luận" onChange={onAddComment} required />
                        <IoMdSend className={styles.icon_send} onClick={sendComment} />
                    </form>

                </div>
                <MdOutlineInsertEmoticon className={styles.icon_emoji} onClick={onActiveEmoji} />
                <div className={`${styles.emoji} ${activeEmoji ? styles.active_emoji : null}`}>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>

            </div>
            {DisplayElementComment(listComments)}
            {listComments.length >= 4 ?
                <div className={styles.view_more} onClick={onViewMore}>Xem các bình luận trước</div>
                : null
            }

        </div>
    )
}

export default Comments
