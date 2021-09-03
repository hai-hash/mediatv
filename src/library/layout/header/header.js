import styles from './../styles.module.scss'
import {BiSearch} from 'react-icons/bi'
import {AiOutlineMail} from 'react-icons/ai'

const Header = () =>{
    return (
        <>
       <div className={styles.header}>
           <div className={styles.header_search}>
            <input type="text" name="search" placeholder="Nhập tên phim, diễn viên ..."/>
           <BiSearch  className={styles.icon}/>
           </div>
           <div className={styles.contact_header}>
               <AiOutlineMail/>
               <span>Liên hệ</span>
           </div>

       </div>
        </>
    )
}

export default Header;