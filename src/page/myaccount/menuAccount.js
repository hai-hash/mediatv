import React, { useContext } from 'react'
import styles from './styles.module.scss';
import { FaUser, FaHistory } from 'react-icons/fa';
import { AiOutlineFolderView, AiOutlineLogout } from 'react-icons/ai';
import { MdNotificationsActive, MdEmojiEvents } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import * as toasts from './../../library/toast/toast';
import { PublicContext } from '../../publicContexts/contexts';
import * as types from './../../handler/profile/profile';

const MenuAccount = ({ setStatus }) => {
    let history = useHistory();
    const { setIsLogin } = useContext(PublicContext);
    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLogin(false);
        history.push("/home");
        toasts.notifySuccess("Đăng xuất thành công");
    }
    const goTo = (status) => {
        setStatus(status);
    }
    return (
        <div className={styles.wap_menu_account}>
            <ul>
                <li onClick={() => goTo(types.PROFILE)}><i><FaUser /></i>Thông tin cá nhân</li>
                <li onClick={() => goTo(types.HISTORYTRANSACTION)}><i><FaHistory /></i>Lịch sử giao dịch</li>
                <li onClick={() => goTo(types.HISTORYVIEW)}><i><AiOutlineFolderView /></i>Đã xem</li>
                <li onClick={() => goTo(types.NOTIFY)}><i><MdNotificationsActive /></i>Thông báo</li>
                <li><i><MdEmojiEvents /></i>Sự kiện</li>
                <li onClick={onLogout}><i><AiOutlineLogout /></i>Đăng xuất</li>
            </ul>
        </div>
    )
}

export default MenuAccount
