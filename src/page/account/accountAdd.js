import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import accountApi from '../../api/account/accountApi';
import * as toasts from './../../library/toast/toast';
const AccountAdd = () => {
    const [data, setData] = useState({ role: "USER" });

    const onChangeForm = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const createNewAccount = async () => {
            try {
                const res = await accountApi.createUser(data);
                console.log(res);
                toasts.notifySuccess("thêm account thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("thêm account thất bại");
            }
        }
        createNewAccount();
    }
    const onRole = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })
    }
    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="fullName" type="text" className="form-control" placeholder="Họ Và Tên" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="email" type="text" className="form-control" placeholder="Email" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="numberPhone" type="text" className="form-control" placeholder="Số Điện Thoại" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="username" type="text" className="form-control" placeholder="Tên tài khoản" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <div className="form-group">
                            <input name="password" type="text" className="form-control" placeholder="Mật Khẩu" required onChange={onChangeForm} />
                        </div>
                    </Col >
                    <Col className={styles.col} xs={12}>
                        <select name="role" className="form-control" select={data?.role} onChange={onRole} required="required">
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

export default AccountAdd
