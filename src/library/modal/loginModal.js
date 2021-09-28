import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
const LogInModal = ({ activeSignIn, onSignIn }) => {
    const [dataForm, setDataForm] = useState({ username: "", password: "" })
    const onChangeForm = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setDataForm({ ...dataForm, [name]: value });
    }
    const onSubmitForm = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <Modal
                isOpen={activeSignIn}
                toggle={onSignIn}
                size="lg"
                style={{ maxWidth: '518px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={styles.content}>
                        <span><img src="/logo/logo2.png" alt="" /></span>
                        <p className={styles.title}>Đăng Nhập</p>

                        <form onSubmit={onSubmitForm}>
                            <div className={styles.line_info}>
                                <input name="username" type="text" className="form-control" placeholder="Tên tài khoản" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="password" type="text" className="form-control" placeholder="Mật Khẩu" required onChange={onChangeForm} />
                            </div>
                            <button className="btn btn-primary">Đăng Nhập</button>
                        </form>

                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LogInModal
