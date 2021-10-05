import React, { useContext } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit } from 'react-icons/ai';
import * as types from './../../handler/account/accountType';
import { PublicContext } from '../../publicContexts/contexts';

const AccountItem = ({ account, setStatus }) => {
    const { setAccountSelect } = useContext(PublicContext);
    const onEdit = () => {
        setStatus(types.EDIT);
        setAccountSelect(account);
    }

    return (
        <tr>
            <th scope="row">{account.id}</th>
            <td>{account.username}</td>
            <td>{account?.fullName ? account?.fullName : ""}</td>
            <td>{account?.email ? account?.email : ""}</td>
            <td>{account?.numberPhone ? account?.numberPhone : ""}</td>
            <td>{account?.role ? account?.role : ""}</td>
            <td>Đang hoạt động</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.edit} >Reset</button>
            </td>
        </tr>
    )
}

export default AccountItem
