import React, { useState } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillFileText } from 'react-icons/ai';
import * as types from './../../handler/video/typeFilm';
export default function ItemFirm({ film, changeActiveFilm, changeHotFilm, setStatus, setId, setFilmSelected }) {
    const [hot, setHot] = useState(film?.hot);
    const [active, setActive] = useState(film?.active);
    const onHot = () => {
        setHot(!hot);
        changeHotFilm(film?.id)
    }
    const onActive = () => {
        setActive(!active);
        changeActiveFilm(film?.id)
    }
    const onDetail = () => {
        setId(film?.id)
        setStatus(types.Detail);
    }
    const onEdit = () => {
        setFilmSelected(film);
        setStatus(types.EDIT)
    }
    return (
        <tr>
            <th scope="row">{film?.id}</th>
            <td>{film?.nameFilm}</td>
            <td>{film?.createDate}</td>
            <td>Danchoi9x</td>
            <td>{film?.countView}</td>
            <td className={hot ? styles.hot : styles.nhot} onClick={onHot}>Hot</td>
            <td className={active ? styles.hot : styles.nhot} onClick={onActive}>Hoạt động</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.detail} onClick={onDetail}><AiFillFileText /></button>
            </td>
        </tr>

    )
}
