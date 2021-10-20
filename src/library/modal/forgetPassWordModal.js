import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai';

const ForgetPassWordModal = ({ activeForgetPassWordModal, onForget }) => {
    const onSubmitForm = (event) => {
        event.preventDefault();
    }
    const onCloseModal = () => {
        onForget();
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
                                <input name="numberPhone" type="text" className="form-control" placeholder="Nhập số điện thoại" required />
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
