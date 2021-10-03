import styles from './styles.module.scss';
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { useHistory } from 'react-router-dom';

const NavItem = ({ film }) => {
    const history = useHistory();
    const onGoToIntroduct = (id) => {
        history.push(`/home/anime/${id}`);
    }
    return (
        <>
            <div className={styles.nav_item} onClick={() => onGoToIntroduct(film?.id)}>
                <img src={`${film?.illustration}`} alt="" />
                <div className={styles.info_item}>
                    <div className={styles.title}>{film?.nameFilm}</div>
                    <div className={styles.content}>{film?.title}</div>
                    <div className={styles.star}><AiFillStar className={styles.star_full} /><AiFillStar className={styles.star_full} /><AiFillStar className={styles.star_full} /><AiFillStar className={styles.star_full} /><AiOutlineStar /></div>
                </div>

            </div>
        </>
    )
}

export default NavItem;