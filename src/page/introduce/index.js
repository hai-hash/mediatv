import styles from './styles.module.scss';
import {Link, useParams} from 'react-router-dom';
import VideoUtils from '../../handler/video/video.utils';
import {useEffect} from 'react';
import * as urls from './../../handler/api/apis.url';

const Introduct = () =>{
    const{ GetFilmById,film} = VideoUtils();
    let { id } = useParams();
    useEffect(() => {
        GetFilmById(urls.GET_FILM_DETAIL,id);
    }, [id]) 
    return (
        <>
        <div className={styles.wap_introduct}>
            <div className={styles.top_introduct}>
                <div className={styles.image_introduct}>
                    <img src={film.illustration ? film.illustration: ""} alt="" />
                    <div className={styles.view}><Link className={styles.view_now} to = {`/home/firm/${id}`}><p>Xem ngay</p></Link></div>
                </div>
                <div className={styles.info_introduct}>
                    <p className={styles.name}>{film.nameFilm ? film.nameFilm : ""}</p>
                    <p className={styles.time}>{film.title ? film.title : ""}</p>
                    <p className={styles.status}>Trạng thái: <span>{film.status ? film.status : ""}</span></p>
                    <p className={styles.director}>Đạo diễn:<span>{film.director ? film.director : ""}</span></p>
                    <p className={styles.actor}>Diễn viên:<span>{film.actor ? film.actor : ""}</span></p>
                    <p className={styles.type}>Thể loại:<span>{film.category ? film.category : "Phim dài tập"}</span></p>
                    <p>Quốc gia: {film.nation ? film.nation : ""}</p>
                    <p>Thời lượng: {film.viewingTime ? film.viewingTime : ""}</p>
                    <p>Lượt xem: {film.countView ? film.countView : 0}</p>
                    <p>Năm xuất bản: {film.year ? film.year: ""}</p>

                </div>

            </div>

        </div>
        </>
    )
}
export default Introduct;