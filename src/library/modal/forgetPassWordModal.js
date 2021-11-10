import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import accountApi from '../../api/account/accountApi';
import * as notify from './../toast/toast';
const ForgetPassWordModal = ({ activeForgetPassWordModal, onForget }) => {
    const [data, setData] = useState();
    const onSubmitForm = (event) => {
        event.preventDefault();
        const sendMail = async () => {
            try {
                const params = {
                    username: data
                }
                const res = await accountApi.sendMail(params);
                notify.notifySuccess("Mật khẩu mới đã gửi vào mail, hãy kiểm tra mail của ban. !");
                console.log(res);
            } catch (error) {
                console.log(error);
                notify.notifyError("Gửi mail không thành công !");
            }
        }
        sendMail();
    }
    const onCloseModal = () => {
        onForget();
    }
    const onChangeData = (e) => {
        let value = e.target.value;
        setData(value);
    }
    return (
        <div>
            <Modal
                isOpen={activeForgetPassWordModal}
                toggle={onForget}
                size="lg"
                style={{ maxWidth: '380px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={`${styles.content} ${styles.content_login}`}>
                        <AiOutlineClose className={styles.btn_close} onClick={onCloseModal} />
                        <span><img src="/logo/logo2.png" alt="" /></span>
                        <p className={styles.title}>Quên mật khẩu</p>

                        <form onSubmit={onSubmitForm}>
                            <div className={styles.line_info}>
                                <input name="username" type="text" className="form-control" placeholder="Nhập Tên tài khoản" required onChange={onChangeData} />
                            </div>

                            <button className="btn">Khôi phục mật khẩu</button>
                        </form>


                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ForgetPassWordModal
