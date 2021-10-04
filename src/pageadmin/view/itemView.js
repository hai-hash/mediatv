import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import styles from './styles.module.scss';
const ItemView = ({ view }) => {
    return (
        <tr>
            <th scope="row">{view?.id}</th>
            <td>{view?.countView}</td>
            <td>{view?.day}</td>
            <td>{view?.month}</td>
            <td>{view?.year}</td>
            <td>{view?.film?.nameFilm}</td>
            <td>{view?.createDate}</td>
            <td className={styles.action}>
                <button className={styles.edit} ><AiOutlineEdit /></button>
            </td>
        </tr>
    )
}

export default ItemView
