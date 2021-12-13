import React, { useContext } from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import episodeAdminApi from '../../api/episode/episodeApi';
import * as types from './../../handler/episode/episodeType';
import { PublicContext } from '../../publicContexts/contexts';
import { formatDate } from './../../common/commonFuncition';

const ItemEpisode = ({ episode, setStatus }) => {

    const { setEpisodeSelect } = useContext(PublicContext);

    const onDelete = () => {
        const deleteEpisodeById = async () => {
            try {
                const res = await episodeAdminApi.delete(episode?.id ? episode.id : 0);
                console.log(res);
                alert("xóa thành công")
            } catch (error) {
                console.log(error);
                alert("xóa thất bại")
            }
        }

        deleteEpisodeById();
    }

    const onEdit = () => {
        setStatus(types.EDIT);
        setEpisodeSelect(episode)
    }
    return (
        <tr>
            <th scope="row">{episode.id}</th>
            <td>{episode.nameEpisode}</td>
            <td>{episode?.film?.nameFilm}</td>
            <td>Danchoi9x</td>
            <td style={{ color: episode?.active ? "green" : "red", fontWeight: 700 }}>{episode?.active ? "Active" : "UnActive"}</td>
            <td>{formatDate(episode.createDate)}</td>
            <td className={styles.action}>
                <button className={styles.edit} onClick={onEdit}><AiOutlineEdit /></button>
                <button className={styles.detail} onClick={onDelete}><AiFillDelete /></button>
            </td>
        </tr>
    )
}

export default ItemEpisode
