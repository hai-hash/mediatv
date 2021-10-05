import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import AccountItem from './accountItem';
import accountApi from '../../api/account/accountApi';
const AccountDisPlay = ({ setStatus }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAllAccount = async () => {
            try {
                const res = await accountApi.getAll();
                setData(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        getAllAccount();
    }, [])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((account, index) => {
                return <AccountItem account={account} key={index} setStatus={setStatus} />
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
                        <th>Tên tài khoản</th>
                        <th>Tên đầy đủ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
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

export default AccountDisPlay
