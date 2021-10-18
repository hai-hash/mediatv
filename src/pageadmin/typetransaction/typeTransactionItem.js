import React from 'react'
import styles from './styles.module.scss';
import { AiFillDelete } from 'react-icons/ai';
const TypeTransactionItem = ({ typeTransaction }) => {
    return (
        <tr>
            <th scope="row">{typeTransaction?.id}</th>
            <td>{typeTransaction?.nameTypeTransaction}</td>
            <td>{typeTransaction?.createDate}</td>
            <td className={styles.action}>
                <button className={styles.detail}><AiFillDelete /></button>
            </td>
        </tr>
    )
}

export default TypeTransactionItem
