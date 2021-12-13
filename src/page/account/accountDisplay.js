import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import styles from './styles.module.scss';
import AccountItem from './accountItem';
import accountApi from '../../api/account/accountApi';
import * as toasts from './../../library/toast/toast';
import { OnFilter, OnFilterByDate, formatDate } from './../../common/commonFuncition';
import { Row, Col } from 'reactstrap';
import { MdRefresh } from 'react-icons/md';
import DialogResetAccount from '../../library/Dialog/dialogResetAccount';

const AccountDisPlay = ({ setStatus }) => {
    const [data, setData] = useState([]);
    const [dataCopy, setDataCopy] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [refreshDate, setRefreshDate] = useState(formatDate(new Date()));
    const [statusDialog, setStatusDiaLog] = useState(false);
    const [accountSelected, setAccountSelected] = useState("");

    useEffect(() => {
        const getAllAccount = async () => {
            try {
                const res = await accountApi.getAll();
                setData(res);
                console.log(res);
                toasts.notifySuccess("lấy danh sách account thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách account thất bại");
            }
        }
        getAllAccount();
    }, [])

    useEffect(() => {
        setDataCopy(data);
    }, [data])

    const Display = (data) => {
        let result = null;
        if (data.length > 0) {
            result = data.map((account, index) => {
                return <AccountItem account={account} key={index} setStatus={setStatus} setStatusDiaLog={setStatusDiaLog} setAccountSelected={setAccountSelected} />
            })
        }
        return result;
    }

    const onFilter = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let dataFilter = OnFilter(name, value, data);
        setDataCopy(dataFilter);
    }

    const onSearch = () => {
        let dataFilter = OnFilterByDate('expirationDate', date.startDate, date.endDate, data);
        setDataCopy(dataFilter);
    }
    const onChangeDate = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setDate({ ...date, [name]: value });
    }

    const onRefresh = () => {
        setRefreshDate(formatDate(new Date()));
        const getAllAccount = async () => {
            try {
                const res = await accountApi.getAll();
                setData(res);
                console.log(res);
                toasts.notifySuccess("lấy danh sách account thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("lấy danh sách account thất bại");
            }
        }
        getAllAccount();
    }

    const onStatusDialog = () => {
        setStatusDiaLog(!statusDialog)
    }


    return (
        <div className={styles.table}>
            <div className={styles.search}>
                <Row>
                    <Col xs="2">
                        <input type="date" name="startDate" style={{ width: '170px' }} onChange={onChangeDate} />
                    </Col>
                    <Col xs="2">
                        <input type="date" name="endDate" style={{ width: '170px' }} onChange={onChangeDate} />
                    </Col>
                    <Col xs="2">
                        <button onClick={onSearch} >Search</button>
                    </Col>
                    <Col xs="3">
                    </Col>
                    <Col xs="3">
                        <span>Last Update : {refreshDate}</span>
                        <MdRefresh size={35} className={styles.icon_refresh} onClick={onRefresh} />

                    </Col>
                </Row>
            </div>
            <Table bordered responsive className={styles.custom_table}>
                <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Tên tài khoản</th>
                        <th>Tên đầy đủ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Vai trò</th>
                        <th>Hạn đăng ký</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text" name="username" className="form-control" onChange={onFilter} /></td>
                        <td><input type="text" name="fullName" className="form-control" onChange={onFilter} /></td>
                        <td><input type="text" className="form-control" name="email" onChange={onFilter} /></td>
                        <td><input type="text" name="numberPhone" className="form-control" onChange={onFilter} /></td>
                        <td><input type="text" name="role" className="form-control" onChange={onFilter} /></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {Display(dataCopy)}
                </tbody>
            </Table>
            <DialogResetAccount statusDialog={statusDialog} onStatusDialog={onStatusDialog} accountSelected={accountSelected} />
        </div>
    )
}

export default AccountDisPlay
