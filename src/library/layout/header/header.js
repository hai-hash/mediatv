import styles from './../styles.module.scss';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";
import { BsMic, BsFillRecord2Fill } from "react-icons/bs";
import { useState, useContext, useEffect } from 'react';
import LogUpModal from '../../modal/logupModal';
import LogInModal from '../../modal/loginModal';
import FireBaseModal from '../../modal/firebaseModal';
import { PublicContext } from './../../../publicContexts/contexts';
import * as toasts from './../../toast/toast';
import { useHistory } from 'react-router-dom';
import PaymentModal from '../../modal/paymentModal';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Header = () => {
    const [active, setActive] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeFireBase, setActiveFireBase] = useState(false);
    const [dataFormSignUp, setDataFormSignUp] = useState({});
    const { isLogin, infoAccount, setIsLogin } = useContext(PublicContext);
    const [dataSearch, setDataSearch] = useState("");
    const [activePayment, setActivePayment] = useState(false);
    const commands = [
        {
            command: ["*"],
            callback: (content) => setContentRecord(content)
        }
    ]
    const [contentRecord, setContentRecord] = useState("");
    const { transcript, listening } = useSpeechRecognition({ commands });
    useEffect(() => {
        if (contentRecord !== "") {
            setDataSearch("");
            history.push(`/home/search/${contentRecord}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentRecord])

    useEffect(() => {
        setDataSearch(transcript);
    }, [transcript])

    const history = useHistory();
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
    const onPayment = () => {
        setActivePayment(!activePayment);
    }
    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLogin(false);
        history.push("/home");
        toasts.notifySuccess("Đăng xuất thành công");
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
    const onChangeContentSearch = (e) => {
        setDataSearch(e.target.value);
    }
    const onSearch = () => {
        setDataSearch("");
        history.push(`/home/search/${dataSearch}`);
    }
    const onRecord = () => {
        SpeechRecognition.startListening();
    }
    const onRecordOff = () => {
        SpeechRecognition.stopListening();
    }
    const onBuyPacket = () => {
        if (isLogin) {
            if (infoAccount?.role !== "VIP") {
                onPayment();
            }
            else {
                toasts.notifyInfo("Hiện tại bạn đang là thành viên VIP !.");
            }

        }
        else {
            onSignIn();
            toasts.notifyInfo("Bạn cần đăng nhập trước khi thực hiện chức năng này !.")
        }
    }
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_search}>
                    {listening ? <BsFillRecord2Fill style={{ color: 'red' }} className={styles.record} onClick={onRecordOff} /> :
                        <BsMic className={styles.mic} onClick={onRecord} />
                    }
                    <input autoComplete="off" value={dataSearch} onChange={onChangeContentSearch} type="text" name="search" placeholder="Nhập tên phim, diễn viên ..." />
                    <BiSearch className={styles.icon} onClick={onSearch} />
                </div>
                <div className={styles.buyPacket} onClick={onBuyPacket}>Mua gói</div>

                <div className={styles.contact_header}>
                    <AiOutlineMail />
                    <span><a href="mailto:whynotme1131999@gmail.com">Liên hệ</a></span>
                </div>
                {!isLogin ? <div className={styles.btn_login} onClick={onSignIn}>Đăng nhập</div> :
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

                            {isLogin &&
                                <ul>
                                    <li>Thông tin cá nhân</li>

                                    <li>Thông Báo</li>
                                    <li>Phim yêu thích</li>
                                </ul>
                            }
                            {
                                isLogin && infoAccount?.role !== "VIP"
                                && <ul> <li onClick={onPayment}>Nâng cấp tài khoản</li></ul>
                            }
                            <ul>
                                <li>Sự kiện</li>
                            </ul>
                            {isLogin &&
                                <ul>
                                    <li onClick={onLogout}>Đăng xuất</li>
                                </ul>
                            }

                        </div>
                    </div>
                }
                <LogUpModal activeSignUp={activeSignUp} onSignUp={onSignUp} setDataFormSignUp={setDataFormSignUp} setActiveFireBase={setActiveFireBase} />
                <LogInModal activeSignIn={activeSignIn} onSignIn={onSignIn} />
                <PaymentModal activePayment={activePayment} onPayment={onPayment} />
                <FireBaseModal activeFireBase={activeFireBase} onFireBase={onFireBase} dataFormSignUp={dataFormSignUp} />
            </div>
        </>
    )
}

export default Header;