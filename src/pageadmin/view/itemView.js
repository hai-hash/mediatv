import React, { useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import styles from './styles.module.scss';
import { PublicContext } from '../../publicContexts/contexts';
import * as types from './../../handler/view/viewType';
const ItemView = ({ view, setStatus }) => {
    const { setViewSelect } = useContext(PublicContext);
    const onEdit = () => {
        setViewSelect(view);
        setStatus(types.EDIT);
    }
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
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
            </td>
        </tr>
    )
}

export default ItemView
