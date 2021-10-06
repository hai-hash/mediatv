import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import EvaluateItem from './evaluateItem';
import evaluateAdminApi from '../../api/evaluate/evaluateApi';
import { findIndex } from 'lodash';
const EvaluateDisplay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);

    // useEffect(() => {
    //     if (id !== 0) {
    //         var index = findIndex(data, (eva) => {
    //             return eva?.id === id;
    //         })
    //         if (index !== -1) {
    //             const a1 = data.slice(0, index);
    //             const a2 = data.slice(index + 1, data.length);
    //             const new_arr = a1.concat(a2);
    //             setData(new_arr);
    //         }
    //     }
    // }, [id])

    useEffect(() => {
        const fetchEvaluateList = async () => {
            try {
                const res = await evaluateAdminApi.getAll();
                setData(res);
                toasts.notifySuccess("lấy danh sách Evaluate thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách Evaluate thất bại");
            }
        }

        fetchEvaluateList();
    }, [])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((evaluate, index) => {
                return <EvaluateItem evaluate={evaluate} key={index} setStatus={setStatus} setId={setId} />
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
                        <th>Số sao đánh giá</th>
                        <th>Tài khoản đánh giá</th>
                        <th>Bộ phim được đánh giá</th>
                        <th>Ngày khởi tạo</th>
                        <th>Ngày cập nhật</th>
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

export default EvaluateDisplay
