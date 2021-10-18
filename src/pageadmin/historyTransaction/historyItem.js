import React from 'react'
import styles from './styles.module.scss';
import { AiFillDelete } from 'react-icons/ai';
import transactionApi from '../../api/transaction/transactionApi';
import * as toasts from './../../library/toast/toast';
const HistoryItem = ({ transaction }) => {
    const onDelete = () => {
        const deleteTranSaction = async () => {
            try {
                const res = await transactionApi.delete(transaction?.id)
                console.log(res);
                toasts.notifySuccess("xóa lịch sử giao dịch thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("xóa lịch sử giao dịch thất bại");
            }
        }
        deleteTranSaction();
    }
    return (
        <tr>
            <th scope="row">{transaction.id}</th>
            <td>{transaction?.contentTransaction}</td>
            <td>{transaction?.money}</td>
            <td>{transaction.createDate}</td>
            <td>{transaction?.account?.username}</td>
            <td>{transaction?.typeTransaction?.nameTypeTransaction}</td>
            <td className={styles.action}>
                <button className={styles.detail} onClick={onDelete}><AiFillDelete /></button>
            </td>
        </tr>
    )
}

export default HistoryItem
