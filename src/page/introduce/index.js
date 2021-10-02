import styles from './styles.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import filmApi from '../../api/film/filmApi';

const Introduct = () => {
    const [data, setData] = useState({});
    let { id } = useParams();
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
    return (
        <>
            <div className={styles.wap_introduct}>
                <div className={styles.top_introduct}>
                    <div className={styles.image_introduct}>
                        <img src={data.illustration ? data.illustration : ""} alt="" />
                        <div className={styles.view}><Link className={styles.view_now} to={`/home/firm/${id}`}><p>Xem ngay</p></Link></div>
                    </div>
                    <div className={styles.info_introduct}>
                        <p className={styles.name}>{data.nameFilm ? data.nameFilm : ""}</p>
                        <p className={styles.time}>{data.title ? data.title : ""}</p>
                        <p className={styles.status}>Trạng thái: <span>{data.status ? data.status : ""}</span></p>
                        <p className={styles.director}>Đạo diễn:<span>{data.director ? data.director : ""}</span></p>
                        <p className={styles.actor}>Diễn viên:<span>{data.actor ? data.actor : ""}</span></p>
                        <p className={styles.type}>Thể loại:<span>{data.category ? data.category : "Phim dài tập"}</span></p>
                        <p>Quốc gia: {data.nation ? data.nation : ""}</p>
                        <p>Thời lượng: {data.viewingTime ? data.viewingTime : ""}</p>
                        <p>Lượt xem: {data.countView ? data.countView : 0}</p>
                        <p>Năm xuất bản: {data.year ? data.year : ""}</p>

                    </div>

                </div>

            </div>
        </>
    )
}
export default Introduct;