import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import episodeAdminApi from '../../api/episode/episodeApi';
import ItemEpisode from './itemEpisode';
import * as toasts from './../../library/toast/toast';
const EpisodeDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchEpisodeList = async () => {
            try {
                const params = {
                    size: 8,
                    page: 0,
                }
                const res = await episodeAdminApi.getAll(params);
                setData(res);
                toasts.notifySuccess("lấy danh sách tập phim thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách tập phim thất bại");
            }
        }

        fetchEpisodeList();
    }, [])


    const Dispplay = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((episode, index) => {
                return <ItemEpisode episode={episode} key={index} setStatus={setStatus} />
            })
        }
        return result;
    }

    return (
        <div className={styles.table}>
            <Table striped>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tên</th>
                        <th>Ngày Tạo</th>
                        <th>Người Tạo</th>
                        <th>Active</th>
                        <th>Phim</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Dispplay(data)}
                </tbody>
            </Table>
        </div>
    )
}

export default EpisodeDisplay;
