import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import viewApi from '../../api/view/viewApi';
import ItemView from './itemView';
const ViewDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAll = async () => {
            try {
                const res = await viewApi.getAll();
                setData(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
    }, [])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((view, index) => {
                return <ItemView view={view} key={index} setStatus={setStatus} />
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
                        <th>Lượt xem</th>
                        <th>Ngày</th>
                        <th>Tháng</th>
                        <th>Năm</th>
                        <th>Phim</th>
                        <th>ngày khởi tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Display(data)}
                </tbody>
            </Table>
        </div>
    )
}

export default ViewDisplay
