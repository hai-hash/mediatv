import styles from './../styles.module.scss';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";
import { useState } from 'react';
import LogUpModal from '../../modal/logupModal';
import LogInModal from '../../modal/loginModal';
import FireBaseModal from '../../modal/firebaseModal';

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [active, setActive] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeFireBase, setActiveFireBase] = useState(false);
    const [dataFormSignUp, setDataFormSignUp] = useState({});
    const onLogin = () => {
        setIsLogin(true);
    }
    const onLogout = () => {
        setIsLogin(false);
    }
    const onActive = () => {
        setActive(!active);
    }
    const onSignUp = () => {
        setActiveSignUp(!activeSignUp);
    }
    const onSignIn = () => {
        setActiveSignIn(!activeSignIn);
    }
    const onFireBase = () => {
        setActiveFireBase(!activeFireBase);
    }
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_search}>
                    <input type="text" name="search" placeholder="Nhập tên phim, diễn viên ..." />
                    <BiSearch className={styles.icon} />
                </div>
                <div className={styles.contact_header}>
                    <AiOutlineMail />
                    <span><a href="mailto:whynotme1131999@gmail.com">Liên hệ</a></span>
                </div>
                <div className={styles.user} onClick={onActive}>
                    <MdAccountCircle className={styles.iconUser} />
                    <div className={`${styles.subMenu} ${active ? styles.active : ""}`}>
                        {isLogin ?
                            <ul>
                                <li className={styles.avatar}>
                                    <div className={styles.icon_name}>
                                        HN
                                    </div>
                                    <div className={styles.name}>
                                        Hải Nguyễn
                                    </div>
                                </li>
                            </ul>
                            : null
                        }

                        {!isLogin ?
                            <ul>
                                <li onClick={onSignIn}>Đăng nhập</li>
                                <li onClick={onSignUp}>Đăng ký</li>
                            </ul>
                            : null
                        }
                        {isLogin &&
                            <ul>
                                <li>Thông tin cá nhân</li>
                                <li>Thông Báo</li>
                                <li>Phim yêu thích</li>
                            </ul>
                        }
                        <ul>
                            <li>Sự kiên</li>
                        </ul>
                        {isLogin &&
                            <ul>
                                <li onClick={onLogout}>Đăng xuất</li>
                            </ul>
                        }

                    </div>
                </div>
                <LogUpModal activeSignUp={activeSignUp} onSignUp={onSignUp} setDataFormSignUp={setDataFormSignUp} setActiveFireBase={setActiveFireBase} />
                <LogInModal activeSignIn={activeSignIn} onSignIn={onSignIn} />
                <FireBaseModal activeFireBase={activeFireBase} onFireBase={onFireBase} dataFormSignUp={dataFormSignUp} />

            </div>
        </>
    )
}

export default Header;