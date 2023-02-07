import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import accountApi from '../../api/account/accountApi';
import { PublicContext } from '../../publicContexts/contexts';
import * as toasts from '../../library/toast/toast';
import { Account } from './utils/account.types';

interface Props {
    accountSelected: Account;
}


const AccountEdit = ({ accountSelected }: Props) => {
    const [data, setData] = useState<Account>({ id: 0, fullName: "", email: "", numberPhone: "", username: "", role: "USER", status: false });


    useEffect(() => {
        setData(accountSelected);
    }, [accountSelected])
    useEffect(() => {
        console.log(accountSelected);
    }, [])

    const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        var name = event.target.name;
        var value = event.target.value;
        setData({ ...data, [name]: value })

    }

    const onSaveFilm = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        const updateNewAccount = async () => {
            try {
                const res = await accountApi.updateUser(data, data?.id);
                console.log(res);
                toasts.notifySuccess("cập nhật account thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("cập nhật account thất bại");
            }
        }
        updateNewAccount();
    }
    const onRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        var name = event.target.name;
        var value = event.target.value;
        setData({ ...data, [name]: value })
    }
    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="fullName" value={data?.fullName ? data?.fullName : ""} type="text" className="form-control" placeholder="Họ Và Tên" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="email" type="text" value={data?.email ? data?.email : ""} className="form-control" placeholder="Email" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="numberPhone" value={data?.numberPhone ? data?.numberPhone : ""} type="text" className="form-control" placeholder="Số Điện Thoại" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="username" value={data?.username} type="text" className="form-control" placeholder="Tên tài khoản" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <select name="role" className="form-control" data-select={data?.role} onChange={onRole} required>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="VIP">VIP</option>
                        </select>

                    </Col >
                    <button type="submit" className="btn btn-primary">Save</button>
                </Row>
            </form>

        </div>
    )
}

export default AccountEdit
