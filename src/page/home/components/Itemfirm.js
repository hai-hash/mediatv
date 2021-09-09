import styles from './styles.module.scss'
import {Switch,Route,Link} from "react-router-dom";

const ItemFirm = ({video}) =>{
    return (
        <>
        <Link to={`/anime/${video.id}`} className={styles.wap_item_firm}>
        <div className={styles.item_firm}>
        <img src ={video.url} alt = ""/>
        <div className={styles.title_banner}>{video.nameVideo}</div>
        <div className={styles.time_banner}>{video.time}</div>
        <span>Full 40/40</span>
        </div>
        </Link>
        </>
    )
}

export default ItemFirm;