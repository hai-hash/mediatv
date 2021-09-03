import styles from './../styles.module.scss'

const Menu = () =>{
    return (
        <>
        <div className={styles.menu}>
            <ul className={styles.category}>
                <li>Home</li>
                <li><span>Thể loại</span></li>
                <li><span>Quốc gia</span></li>
                <li><span>Phim lẻ</span></li>
                <li><span>Phim bộ</span></li>
                <li><span>Hoạt Hình</span></li>
                <li><span>Chiếu Rạp</span></li>
                <li><span>TV Show</span></li>
            </ul>

        </div>
        </>
    );
}
export default Menu;