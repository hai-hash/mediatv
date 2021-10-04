import styles from './styles.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import filmApi from '../../api/film/filmApi';
import LogInModal from '../../library/modal/loginModal';
import ReactStars from "react-rating-stars-component";
import { AiOutlineBook, AiFillEye ,AiOutlineShareAlt} from 'react-icons/ai';
import Comments from '../comments/comments';
import ShareModal from '../../library/share/shareModal';
import viewApi from '../../api/view/viewApi';

const Introduct = () => {
    const [data, setData] = useState({});
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeShare, setActiveShare] = useState(false);
    let { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        const fetchFilmId = async () => {
            try {
                const res = await filmApi.get(id);
                setData(res);
            } catch (error) {
                console.log("Failed to fetch film detail :", error);
            }
        }

        fetchFilmId();
    }, [id])

    const onViewNow = () => {
        var token = localStorage.getItem("token");
        if (token) {
            const addView = async () => {
                try {
                    const res = await viewApi.addViewByFilm(id)
                    console.log(res);
                } catch (error) {
                    console.log(error)
                }
            }

            history.push(`/home/firm/${id}`);
            addView();
        }
        else {
            setActiveSignIn(true);
        }

    }

    const onShare = () => {
        setActiveShare(!activeShare);
    }
    const onSignIn = () => {
        setActiveSignIn(!activeSignIn);
    }

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <>
            <div className={styles.wap_introduct}>
                <div className={styles.top_introduct}>
                    <div className={styles.image_introduct}>
                        <img src={data.illustration ? data.illustration : ""} alt="" />
                        <div className={styles.view} onClick={onViewNow}><p>Xem ngay</p></div>
                    </div>
                    <div className={styles.info_introduct}>
                        <p className={styles.name}>{data.nameFilm ? data.nameFilm : ""}</p>
                        <p className={styles.time}>{data.title ? data.title : ""}</p>
                        <p className={styles.status}>Trạng thái: <span>{data.status ? data.status : ""}</span></p>
                        <p className={styles.director}>Đạo diễn: <span>{data.director ? data.director : ""}</span></p>
                        <p className={styles.actor}>Diễn viên: <span>{data.actor ? data.actor : ""}</span></p>
                        <p className={styles.type}>Thể loại: <span>{data.category ? data.category : "Phim dài tập"}</span></p>
                        <p>Quốc gia: {data.nation ? data.nation : ""}</p>
                        <p>Thời lượng: {data.viewingTime ? data.viewingTime : ""}</p>
                        <p>Lượt xem: <AiFillEye />  {data.countView ? data.countView : 0}</p>
                        <p>Năm xuất bản: {data.year ? data.year : ""}</p>
                        <div className={styles.evaluate}>
                            <div className={styles.number_star_tb}>5</div>
                            <div className={styles.evaluate_star}>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={34}
                                    activeColor="#ffd700"
                                />
                                <span className={styles.total_count_evaluate}>7 lượt đánh giá</span>
                            </div>

                        </div>


                    </div>


                </div>
                <LogInModal activeSignIn={activeSignIn} onSignIn={onSignIn} />

            </div>
            <div className={styles.content_film}>
                <div className={styles.icon_content}><AiOutlineBook size={40} /> NỘI DUNG PHIM</div>
                <div className={styles.content}>
                    Này! Cậu Rất Ổn Áp / Ơ Hay! Đại Sự Của Ngươi Thật Vi Diệu - Hei! Ni Da Shi Hen Miao xoay quanh câu chuyện về hai người bạn thanh mai trúc mã Hùng Kỳ Kỳ và Lê Nhất Hòa, cả hai đều sinh cùng ngày và cùng một thị trấn, cùng nhau lớn lên. Nhưng tính cách của cả hai lại trái ngược nhau khi Hùng Kỳ Kỳ là một cô gái vô cùng lười nhát luôn thích ở trong nhà, còn chàng trai Lê Nhất Hòa lại vô cùng thẳng thắn nghiêm tục. Mặc dù tính cách khác nhau nhưng cả hai vẫn luôn có mối quan hệ tốt đẹp và giúp đỡ nhau trong cuộc sống và trên con đường thực hiện ước mơ của mỗi người.
                </div>
                <div className={styles.content_image} style={{ background: `url(${data.illustration ? data.illustration : ""})` }}>

                </div>
            </div>
            <div className={styles.share}>
                <span className={styles.facebook} onClick={onShare}><AiOutlineShareAlt size={20} />  Chia Sẻ</span>
                <ShareModal activeShare={activeShare} onShare={onShare} id={id} />
            </div>
            <Comments id={id} />
        </>
    )
}
export default Introduct;