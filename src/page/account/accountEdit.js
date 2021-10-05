import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import accountApi from '../../api/account/accountApi';
import { PublicContext } from '../../publicContexts/contexts';

const AccountEdit = () => {
    const [data, setData] = useState({ fullName: "", email: "", numberPhone: "", username: "", role: "USER" });
    const { accountSelect } = useContext(PublicContext);


    useEffect(() => {
        setData(accountSelect);
    }, [accountSelect])

    const onChangeForm = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const updateNewAccount = async () => {
            try {
                const res = await accountApi.updateUser(data, data?.id);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        updateNewAccount();
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

export default AccountEdit
