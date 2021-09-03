import styles from './../styles.module.scss'
import {AiFillHome} from 'react-icons/ai'
import {AiOutlineBlock} from 'react-icons/ai'
import {BiGlobe} from 'react-icons/bi'
import {GrMultimedia} from 'react-icons/gr'
import {RiPlayList2Fill} from 'react-icons/ri'
import {GiJusticeStar} from 'react-icons/gi'
import {MdPlaylistPlay} from 'react-icons/md'
import {BiCaretRightCircle} from 'react-icons/bi'

const Menu = () =>{
    return (
        <>
        <div className={styles.menu}>
            <ul className={styles.category}>
                <li><AiFillHome className={styles.icon_home}/></li>
                <li><AiOutlineBlock className={styles.icon_category}/><span>Thể loại</span></li>
                <li><BiGlobe className={styles.icon_nation}/><span>Quốc gia</span></li>
                <li><GrMultimedia className={styles.icon_media}/><span>Phim lẻ</span></li>
                <li><RiPlayList2Fill className={styles.icon_firm}/><span>Phim bộ</span></li>
                <li><GiJusticeStar className={styles.icon_star}/><span>Hoạt Hình</span></li>
                <li><MdPlaylistPlay className={styles.icon_cinema}/><span>Chiếu Rạp</span></li>
                <li><BiCaretRightCircle className={styles.icon_tvshow}/><span>TV Show</span></li>
            </ul>

        </div>
        </>
    );
}
export default Menu;