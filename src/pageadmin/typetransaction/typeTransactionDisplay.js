import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import transactionApi from '../../api/transaction/transactionApi';
import TypeTransactionItem from './typeTransactionItem';

const TypeTransactionDisplay = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTransactionList = async () => {
            try {
                const res = await transactionApi.getAllType();
                setData(res);
                toasts.notifySuccess("lấy danh sách thể loại giao dịch thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách thể loại giao dịch thất bại");
            }
        }

        fetchTransactionList();
    }, [])


    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((typeTransaction, index) => {
                return <TypeTransactionItem typeTransaction={typeTransaction} key={index} />
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
                        <th>Hình thức giao dịch</th>
                        <th>Ngày Tạo</th>
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

export default TypeTransactionDisplay
