import styles from './styles.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import filmApi from '../../api/film/filmApi';
import LogInModal from '../../library/modal/loginModal';
import ReactStars from "react-rating-stars-component";
import { AiOutlineBook, AiFillEye, AiOutlineShareAlt, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Comments from '../comments/comments';
import ShareModal from '../../library/share/shareModal';
import viewApi from '../../api/view/viewApi';
import evaluateAdminApi from '../../api/evaluate/evaluateApi';
import * as toasts from './../../library/toast/toast';
import { PublicContext } from '../../publicContexts/contexts';
import RecommenderFilm from '../recommender/recommenderFilm';
import PaymentModal from './../../library/modal/paymentModal';

const Introduct = () => {
    const [data, setData] = useState({});
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeShare, setActiveShare] = useState(false);
    let { id } = useParams();
    const history = useHistory();
    const { infoAccount } = useContext(PublicContext);
    const [star, setStar] = useState({ valueStarTb: 0, total: 0 });
    const [starCurren, setStarCurren] = useState(0);
    const [activePayment, setActivePayment] = useState(false);
    const [activeViewMore, setActiveViewMore] = useState(false);
    useEffect(() => {
        const getTotalAndValueStar = async () => {
            try {
                const res = await evaluateAdminApi.getTotalAndValueTbStar(id);
                setStar(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        getTotalAndValueStar();

    }, [id, starCurren])

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
            if (data?.cost) {
                if (infoAccount?.role !== 'VIP') {
                    setActivePayment(true);
                    toasts.notifyInfo("Đây là bộ phim tính phí, vui lòng nâng cấp tài khoản để tiếp tục xem");
                }
                else {
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
            }
            else {
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
    const onPayment = () => {
        setActivePayment(!activePayment);
    }

    const ratingChanged = (newRating) => {
        var token = localStorage.getItem("token");
        if (token) {
            const updateStar = async () => {
                try {
                    const res = await evaluateAdminApi.updateStar(id, infoAccount?.username, parseInt(newRating));
                    console.log(res);
                    toasts.notifySuccess("đánh giá của bạn đã được ghi nhận");
                    setStarCurren(parseInt(newRating));
                } catch (error) {
                    console.log(error);
                    toasts.notifyError("đánh giá của bạn ghi nhận thất bại");
                }
            }
            updateStar();
        }
        else {
            setActiveSignIn(true);
            toasts.notifyWarning("bạn cần đăng nhập để thực hiện đánh giá")

        }

    };
    const onViewMore = () => {
        setActiveViewMore(!activeViewMore);
    }
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
                        <p className={styles.time}><span>{data.title ? data.title : ""}</span></p>
                        <p className={styles.status}>Trạng thái: <span>{data.status ? data.status : ""}</span></p>
                        <p className={styles.director}>Đạo diễn: <span>{data.director ? data.director : ""}</span></p>
                        <p className={styles.actor}>Diễn viên: <span>{data.actor ? data.actor : ""}</span></p>
                        <p className={styles.type}>Thể loại: <span>{data.category ? data.category : "Phim dài tập"}</span></p>
                        <p className={styles.nation}>Quốc gia:<span> {data.nation ? data.nation : ""}</span></p>
                        <p className={styles.timeView}>Thời lượng:<span> {data.viewingTime ? data.viewingTime : ""}</span></p>
                        <p className={styles.countView}>Lượt xem:<span> <AiFillEye />  {data.countView ? data.countView : 0}</span></p>
                        <p className={styles.year}>Năm xuất bản:<span> {data.year ? data.year : ""}</span></p>
                        <div className={styles.evaluate}>
                            <div className={styles.number_star_tb}>{star?.valueStarTb}</div>
                            <div className={styles.evaluate_star}>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={34}
                                    activeColor="#ffd700"
                                />
                                <span className={styles.total_count_evaluate}>{star?.total} lượt đánh giá</span>
                            </div>

                        </div>


                    </div>


                </div>
                <LogInModal activeSignIn={activeSignIn} onSignIn={onSignIn} />

            </div>
            <div className={styles.content_film}>
                <div className={styles.icon_content}><AiOutlineBook size={40} /> NỘI DUNG PHIM</div>
                <div className={styles.content}>
                    {!data?.decription ? " Hãy xem để biết nội dung nhé , nói trước mất hay" : null}
                    {`${activeViewMore ? data?.decription : data?.decription?.substring(0, 310)} ${data?.decription?.length > 310 ? '....' : ''}`}
                </div>
                {data?.decription?.length > 310 ?
                    <div className={styles.view_more}>
                        <p onClick={onViewMore}>{activeViewMore ? <>Thu gọn <AiFillCaretUp /></> : <>Xem thêm <AiFillCaretDown /></>}</p>
                    </div> : null
                }
                <div className={styles.content_image} style={{ background: `url(${data.illustration ? data.illustration : ""})` }}>

                </div>
            </div>
            <div className={styles.share}>
                <span className={styles.facebook} onClick={onShare}><AiOutlineShareAlt size={20} />  Chia Sẻ</span>
                <ShareModal activeShare={activeShare} onShare={onShare} id={id} />
            </div>
            <Comments id={id} />
            <RecommenderFilm id={id} />
            <PaymentModal activePayment={activePayment} onPayment={onPayment} />
        </>
    )
}
export default Introduct;