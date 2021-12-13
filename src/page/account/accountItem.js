import React, { useContext, useState } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit } from 'react-icons/ai';
import * as types from './../../handler/account/accountType';
import { PublicContext } from '../../publicContexts/contexts';
import accountApi from '../../api/account/accountApi';
import * as notifys from './../../library/toast/toast';

const AccountItem = ({ account, setStatus, setStatusDiaLog, setAccountSelected }) => {
    const { setAccountSelect } = useContext(PublicContext);
    const [statusAccount, setStatusAccount] = useState(account?.status ? true : false);
    const onEdit = () => {
        setStatus(types.EDIT);
        setAccountSelect(account);
    }

    const onChangeStatus = (username) => {
        const changeStatusAccount = async () => {
            try {
                const res = await accountApi.changeStatusAccount(username);
                console.log(res);
                setStatusAccount(!statusAccount);
                notifys.notifySuccess("Thay đổi trạng thái tài khoản thành công");
            } catch (error) {
                console.log(error);
                notifys.notifyError("Thay đổi trang thái thất bại");
            }
        }
        changeStatusAccount();
    }

    const onResetPassWord = (username) => {
        setStatusDiaLog(true);
        setAccountSelected(username);
    }

    return (
        <tr>
            <th scope="row">{account.id}</th>
            <td>{account.username}</td>
            <td>{account?.fullName ? account?.fullName : ""}</td>
            <td>{account?.email ? account?.email : ""}</td>
            <td>{account?.numberPhone ? account?.numberPhone : ""}</td>
            <td>{account?.role ? account?.role : ""}</td>
            <td >{account?.expirationDate ? account?.expirationDate : "Chưa từng đăng ký"}</td>
            <td onClick={() => onChangeStatus(account?.username)}><span className={styles.status_account} style={{ backgroundColor: statusAccount ? '#ffc107' : 'red' }}>{statusAccount ? "active" : "locked"}</span></td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.delete} onClick={() => onResetPassWord(account?.username)} >Reset</button>
            </td>
        </tr>
    )
}

export default AccountItem
