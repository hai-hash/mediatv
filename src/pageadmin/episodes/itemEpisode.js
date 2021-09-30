import React from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillFileText } from 'react-icons/ai';

const ItemEpisode = ({ episode, setStatus }) => {

    const onDetail = () => {
    }

    const onEdit = () => {
       
    }
    return (
        <tr>
            <th scope="row">{episode.id}</th>
            <td>{episode.nameEpisode}</td>
            <td>{episode.createDate}</td>
            <td>Danchoi9x</td>
            <td>{episode?.active ? "đang hoạt động" : "không hoạt động"}</td>
            <td>{episode?.film?.nameFilm}</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.detail} onClick={onDetail}><AiFillFileText /></button>
            </td>
        </tr>
    )
}

export default ItemEpisode
