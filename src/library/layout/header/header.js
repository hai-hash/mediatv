import styles from './../styles.module.scss';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";
import { BsMic, BsFillRecord2Fill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState, useContext, useEffect } from 'react';
import LogUpModal from '../../modal/logupModal';
import LogInModal from '../../modal/loginModal';
import FireBaseModal from '../../modal/firebaseModal';
import { PublicContext } from './../../../publicContexts/contexts';
import * as toasts from './../../toast/toast';
import { useHistory } from 'react-router-dom';
import PaymentModal from '../../modal/paymentModal';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import filmApi from '../../../api/film/filmApi';
import * as types from './../../../handler/profile/profile';
import SockJsClient from 'react-stomp';
import followApi from '../../../api/follow/followApi';

const SOCKET_URL = 'https://file-managementt.herokuapp.com/api/public/ws-message';
const Header = () => {
    const [active, setActive] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeFireBase, setActiveFireBase] = useState(false);
    const [dataFormSignUp, setDataFormSignUp] = useState({});
    const { isLogin, infoAccount, setIsLogin, isLoadingFollow, setIsLoadingFollow } = useContext(PublicContext);
    const [dataSearch, setDataSearch] = useState("");
    const [activePayment, setActivePayment] = useState(false);
    const [activeRecommend, setRecommend] = useState(false);
    const [dataRecommend, setDataRecommend] = useState([]);
    const [countNotify, setCountNotify] = useState(0);
    const [listNotify, setListNotify] = useState([]);
    const [listIdFollow, setListIdFollow] = useState([]);
    const commands = [
        {
            command: ["*"],
            callback: (content) => setContentRecord(content)
        }
    ]
    const [contentRecord, setContentRecord] = useState("");
    const { transcript, listening } = useSpeechRecognition({ commands });
    useEffect(() => {
        const getFollowByUserCurrent = async () => {
            try {
                const res = await followApi.getFollow();
                setListIdFollow(res);
            } catch (error) {
                console.log(error);
            }
        }
        if (isLoadingFollow === true) {
            getFollowByUserCurrent();
            setIsLoadingFollow(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingFollow])
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

    useEffect(() => {
        console.log("da thay doi")
    }, [listNotify])

    useEffect(() => {
        const getWordRecommend = async () => {
            try {
                const params = {
                    name: dataSearch,
                }
                const res = await filmApi.getWordRecommendSearch(params);
                setDataRecommend(res);
            } catch (error) {
                console.log(error);
            }
        }
        if (dataSearch !== "") {
            getWordRecommend();
        }
        else {
            setDataRecommend([]);
        }

    }, [dataSearch])

    useEffect(() => {
        if (dataRecommend.length > 0) {
            setRecommend(true);
        }
        else {
            setRecommend(false);
        }
    }, [dataRecommend])


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

    const getListNotify = function () {
        let result = null;
        if (listNotify.length > 0) {
            result = listNotify.map((item, index) => {
                return <div className={styles.itemNotify} key={index}>
                    <div className={styles.imageNotify}>
                    </div>
                    <div className={styles.contentItemNotify}>
                        <div className={styles.titleNotifyItem}>{item?.titleNotify}</div>
                        <div className={styles.contentNotifyItemDetail}>{item?.contentNotify}</div>
                    </div>
                </div>
            })
        }
        return result;

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
    const onGoToProfile = () => {
        history.push(`/account/${types.PROFILE}`);
    }
    const onGoToSearch = (data) => {
        setDataSearch("");
        history.push(`/home/search/${data}`);
    }

    const displayWordRecommend = () => {
        let result = null;
        if (dataRecommend.length > 0) {
            result = dataRecommend.map((data, index) => {
                return <p key={index} onClick={() => onGoToSearch(data)}>{data}</p>
            }
            )
        }
        return result;
    }
    const onToNotify = () => {
        history.push(`/account/${types.NOTIFY}`);
    }

    const addItemNotify = (item) => {
        let newListNotify = [...listNotify];
        newListNotify.push(item);
        setListNotify(newListNotify);
        console.log(newListNotify);
    }

    let onMessageReceived = (msg) => {
        let newCount = countNotify;
        setCountNotify(++newCount);
        addItemNotify(msg);
        toasts.notifyInfo(msg.message);

    }

    const renderSocketNotifyFollow = () => {
        let result = null
        if (listIdFollow && listIdFollow.length) {
            result = listIdFollow.filter(item => item.id !== null).map((item, index) => {
                return <div key={index}>
                    <SockJsClient
                        url={SOCKET_URL}
                        topics={[`/topic/message/notify/${item.id}`]}
                        onConnect={console.log("Connect Notify !")}
                        onDisconnect={console.log("Disconnected!")}
                        onMessage={(msg) => onMessageReceived(msg)}
                        debug={false}
                    />
                </div>
            })
        }
        return result;
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
                    <div className={`${styles.recommend} ${activeRecommend ? styles.active_recommend : null}`}>
                        {displayWordRecommend()}
                    </div>
                </div>
                <div className={styles.notify}>
                    <IoMdNotificationsOutline />
                    <div className={styles.numberNotify}>{countNotify}</div>
                    <div>
                        <SockJsClient
                            url={SOCKET_URL}
                            topics={[`/topic/message/notify/all`]}
                            onConnect={console.log("Connect Notify !")}
                            onDisconnect={console.log("Disconnected!")}
                            onMessage={(msg) => onMessageReceived(msg)}
                            debug={false}
                        />
                    </div>
                    {isLogin ?
                        <div>
                            <SockJsClient
                                url={SOCKET_URL}
                                topics={[`/topic/message/notify/${infoAccount.username ? infoAccount.username : 'user'}`]}
                                onConnect={console.log("Connect Notify !")}
                                onDisconnect={console.log("Disconnected!")}
                                onMessage={(msg) => onMessageReceived(msg)}
                                debug={false}
                            />
                        </div> : null
                    }
                    {isLogin ?
                        renderSocketNotifyFollow() : null
                    }

                    <div className={styles.contentNotify}>
                        <div className={styles.arrow_up}></div>
                        <p className={styles.titleContentNotify}>Thông Báo Mới Nhận</p>
                        <div className={styles.listNotify}>
                            {
                                getListNotify()
                            }
                        </div>
                        <p className={styles.viewAll} onClick={onToNotify}>Xem Tất Cả</p>
                    </div>

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
                        {infoAccount?.role === "VIP" && <div className={styles.icon_vip}><img src="/logo/king.png" alt="fire" /></div>}

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
                                    <li onClick={onGoToProfile}>Thông tin cá nhân</li>

                                    <li onClick={onToNotify}>Thông Báo</li>
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