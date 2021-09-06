import styles from './styles.module.scss'
import {Switch,Route,Link} from "react-router-dom";

const ItemFirm = () =>{
    return (
        <>
        <Link to="/anime">
        <div className={styles.item_firm}>
        <img src ="https://i.pinimg.com/474x/27/c5/fa/27c5fac7833c0233cef69700e4b44ee6.jpg" alt = ""/>
        <div className={styles.title_banner}>anime bubu siêu hay kịch tính</div>
        <div className={styles.time_banner}>1999</div>
        <span>Full 40/40</span>
        </div>
        </Link>
        </>
    )
}

export default ItemFirm;