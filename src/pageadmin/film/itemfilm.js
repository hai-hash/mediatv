import React, { useState, useContext } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillFileText } from 'react-icons/ai';
import * as types from './../../handler/video/typeFilm';
import { PublicContext } from '../../publicContexts/contexts';
import filmAdminApi from '../../api/film/filmAdminApi';
export default function ItemFirm({ film, setStatus, setId, }) {
    const [hot, setHot] = useState(film?.hot);

    const [active, setActive] = useState(film?.active);

    const { setFilmSelect } = useContext(PublicContext);

    const onHot = () => {
        setHot(!hot);
        const changeHotFilm = async () => {
            try {
                const res = await filmAdminApi.changeHot(film?.id)
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        changeHotFilm();
    }

    const onActive = () => {
        setActive(!active);
        const changeActiveFilm = async () => {
            try {
                const res = await filmAdminApi.changeActive(film?.id)
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        changeActiveFilm();
    }

    const onDetail = () => {
        setId(film?.id);
        setStatus(types.Detail);
    }

    const onEdit = () => {
        setStatus(types.EDIT);
        setFilmSelect(film);
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
