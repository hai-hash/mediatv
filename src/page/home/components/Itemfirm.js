import styles from './styles.module.scss'
import { Link } from "react-router-dom";

const ItemFirm = ({ video }) => {
    return (
        <>
            <Link to={`/home/anime/${video.id}`} className={styles.wap_item_firm}>
                <div className={styles.item_firm}>
                    <img src={video?.illustration} alt="" />
                    <div className={styles.title_banner}>{video.nameFilm}</div>
                    <div className={styles.time_banner}>{video.viewingTime}</div>
                    <span>{video.status}</span>
                </div>
            </Link>
        </>
    )
}

export default ItemFirm;