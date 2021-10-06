import React from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import * as types from './../../handler/evaluate/evaluateType';
import evaluateAdminApi from '../../api/evaluate/evaluateApi';
const EvaluateItem = ({ evaluate, setStatus, setId }) => {

    const onEdit = () => {
        setStatus(types.EDIT);
    }
    const onDelete = () => {
        const deleteEvaluate = async () => {
            try {
                const res = await evaluateAdminApi.delete(evaluate?.id);
                console.log(res);

                setId(evaluate?.id);
            } catch (error) {
                console.log(error);

            }
        }
        deleteEvaluate();
    }

    return (
        <tr>
            <th scope="row">{evaluate.id}</th>
            <td>{evaluate?.star}</td>
            <td>{evaluate?.account?.username}</td>
            <td>{evaluate?.film?.nameFilm}</td>
            <td>{evaluate?.createDate}</td>
            <td>{evaluate?.modifyDate}</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.detail} onClick={onDelete}><AiFillDelete /></button>
            </td>
        </tr>
    )
}

export default EvaluateItem
