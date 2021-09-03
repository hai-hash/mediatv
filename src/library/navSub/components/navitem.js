import styles from './styles.module.scss';
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'

const NavItem = () =>{
    return (
        <>
        <div className={styles.nav_item}>
            <img src="https://phunugioi.com/wp-content/uploads/2020/10/anh-dai-dien-avt-anime-1.jpg" alt = "" />
            <div className={styles.info_item}>
                <div className={styles.title}>One pea</div>
                <div className={styles.content}>Phim siêu hay</div>
                <div className={styles.star}><AiFillStar className={styles.star_full}/><AiFillStar className={styles.star_full}/><AiFillStar className={styles.star_full}/><AiFillStar className={styles.star_full}/><AiOutlineStar/></div>
            </div>

        </div>
        </>
    )
}

export default NavItem;