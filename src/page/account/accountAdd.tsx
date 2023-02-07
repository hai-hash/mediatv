import React from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import AccountAddUtils from './utils/account.add.utils';
const AccountAdd = () => {
    const {
        data,
        onChangeForm,
        onRole,
        onSaveFilm
    } = AccountAddUtils();


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

export default AccountAdd
