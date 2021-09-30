import React, { useContext } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillFileText } from 'react-icons/ai';
import * as types from './../../handler/category/typeCategory';
import { PublicContext } from '../../publicContexts/contexts';
const ItemCategory = ({ category, setStatus }) => {

    const { setCategorySelect } = useContext(PublicContext);

    const onDetail = () => {
        setStatus(types.DETAIL);
    }

    const onEdit = () => {
        setStatus(types.EDIT);
        setCategorySelect(category);
    }
    return (
        <tr>
            <th scope="row">{category.id}</th>
            <td>{category.nameCategory}</td>
            <td>{category.createDate}</td>
            <td>Danchoi9x</td>
            <td>Đang hoạt động</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.detail} onClick={onDetail}><AiFillFileText /></button>
            </td>
        </tr>
    )
}

export default ItemCategory
