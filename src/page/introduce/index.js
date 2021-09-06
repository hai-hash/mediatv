import styles from './styles.module.scss'
import {Link} from 'react-router-dom'

const Introduct = () =>{
    return (
        
        <>
        <div className={styles.wap_introduct}>
            <div className={styles.top_introduct}>
                <div className={styles.image_introduct}>
                    <img src="https://i.pinimg.com/474x/27/c5/fa/27c5fac7833c0233cef69700e4b44ee6.jpg" alt="" />
                    <div className={styles.view}><Link to = "/firm"><p>Xem ngay</p></Link></div>
                </div>
                <div className={styles.info_introduct}>
                    <p className={styles.name}>Bí Mật Nơi Góc Tối</p>
                    <p className={styles.time}>Secrets In The Lattice (2021)</p>
                    <p className={styles.status}>Trạng thái: <span>Hoàn Tất 25/24 Tập</span></p>
                    <p className={styles.director}>Đạo diễn:<span> Trương Tiếu Yên</span></p>
                    <p className={styles.actor}>Diễn viên:<span> Lưu Chỉ Vy, Phàn Trị Hân, Trần Triết Viễn, Từ Mộng Khiết, Vương Nhất Lam, Vương Trạch Hiên,</span></p>
                    <p className={styles.type}>Thể loại:<span> Học đường, Tâm lý, Tình cảm,</span></p>
                    <p>Quốc gia: Trung Quốc,</p>
                    <p>Thời lượng: 40 phút/tập</p>
                    <p>Lượt xem: 187,976</p>
                    <p>Năm xuất bản: 2021</p>

                </div>

            </div>

        </div>
        </>
    )
}
export default Introduct;