import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillFileText } from 'react-icons/ai';
import * as types from './../../handler/video/typeFilm';
import { PublicContext } from '../../publicContexts/contexts';
import filmAdminApi from '../../api/film/filmAdminApi';
import { formatDate } from './../../common/commonFuncition';
export default function ItemFirm({ film, setStatus, setId, }) {
    const [hot, setHot] = useState(film?.hot);

    const [active, setActive] = useState(film?.active);

    const [cost, setCost] = useState(film?.cost);

    const { setFilmSelect } = useContext(PublicContext);

    useEffect(() => {
        setCost(film?.cost);
        setHot(film?.hot);
        setActive(film?.active);
    }, [film])
    const onHot = () => {
        setHot(!hot);
        const changeHotFilm = async () => {
            try {
                const res = await filmAdminApi.changeHot(film?.id);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        changeHotFilm();
    }

    const onCost = () => {
        setCost(!cost);
        const changeCostFilm = async () => {
            try {
                const res = await filmAdminApi.changeCost(film?.id);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        changeCostFilm();
    }

    const onActive = () => {
        setActive(!active);
        const changeActiveFilm = async () => {
            try {
                const res = await filmAdminApi.changeActive(film?.id);
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
            <td>{film?.countView}</td>
            <td className={cost === true ? styles.cost : styles.nhot} onClick={onCost}>{cost ? "Tính phí" : "Free"}</td>
            <td className={hot ? styles.hot : styles.nhot} onClick={onHot}>{hot ? "Hot" : "Normal"}</td>
            <td className={active ? styles.active : styles.nhot} onClick={onActive}>{active ? "Active" : "UnActive"}</td>
            <td>{formatDate(film?.createDate)}</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.detail} onClick={onDetail}><AiFillFileText /></button>
            </td>
        </tr>

    )
}
