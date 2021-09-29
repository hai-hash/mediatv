import styles from './../styles.module.scss';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";
import { useState, useContext } from 'react';
import LogUpModal from '../../modal/logupModal';
import LogInModal from '../../modal/loginModal';
import FireBaseModal from '../../modal/firebaseModal';
import { PublicContext } from './../../../publicContexts/contexts';
const Header = () => {
    const [active, setActive] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeFireBase, setActiveFireBase] = useState(false);
    const [dataFormSignUp, setDataFormSignUp] = useState({});
    const { isLogin, infoAccount, setIsLogin } = useContext(PublicContext);
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
    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLogin(false);
        alert("Đăng xuất thành công");
    }
    const getName = (name) => {
        var result = "";
        if (name !== null) {
            var arr_name = name?.split(" ");
            if (arr_name) {
                if (arr_name.length < 4) {
                    for (name of arr_name) {
                        result += name.charAt(0).toUpperCase();
                    }
                }
                else {
                    result += arr_name[0].charAt(0).toUpperCase() + arr_name[arr_name.length - 1].charAt(0).toUpperCase();
                }
            }
        }
        return result;
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
                    {isLogin ?
                        <div className={styles.iconUserText}> {getName(infoAccount?.fullName)}</div>
                        : <MdAccountCircle className={styles.iconUser} />
                    }
                    <div className={`${styles.subMenu} ${active ? styles.active : ""}`}>
                        {isLogin ?
                            <ul>
                                <li className={styles.avatar}>
                                    <div className={styles.icon_name}>
                                        {getName(infoAccount?.fullName)}
                                    </div>
                                    <div className={styles.name}>
                                        {infoAccount?.fullName}
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