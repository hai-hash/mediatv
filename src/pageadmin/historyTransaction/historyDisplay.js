import HistoryItem from './historyItem'
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import transactionApi from '../../api/transaction/transactionApi';
const HistoryDisplay = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTransactionList = async () => {
            try {
                const res = await transactionApi.getAll();
                setData(res);
                toasts.notifySuccess("lấy danh sách lịch sử giao dịch thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách lịch sử giao dịch thất bại");
            }
        }

        fetchTransactionList();
    }, [])


    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((transaction, index) => {
                return <HistoryItem transaction={transaction} key={index} />
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
                        <th>Nội dung giao dịch</th>
                        <th>Số tiền giao dịch</th>
                        <th>Ngày Tạo</th>
                        <th>Người Tạo</th>
                        <th>Hình thức thanh toán</th>
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

export default HistoryDisplay
