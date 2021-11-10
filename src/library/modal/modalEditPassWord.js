import React, { useState, useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai';

const ModalEditPassWord = ({ activeModalChangePassWord, onModalChangePass }) => {
    const [data, setData] = useState({ newPassword: "", enterPassword: "", oldPassword: "" });
    const onChangeData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }

    useEffect(() => {
        console.log(data)
        if (data?.enterPassword !== "" && data?.newPassword !== data?.enterPassword) {
            console.log("nó khác nhau vl anh ơi");
        }
    }, [data])

    return (
        <div>
            <Modal
                isOpen={activeModalChangePassWord}
                toggle={onModalChangePass}
                size="lg"
                style={{ maxWidth: '601px', borderRadius: '10px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={`${styles.content} ${styles.content_login}`}>
                        <AiOutlineClose className={styles.btn_close} onClick={onModalChangePass} />
                        <h4 className={styles.title_changePass}>Thay đổi mật khẩu</h4>
                        <div className={styles.wap_info_change_pass}>
                            <p>Vui lòng nhập mật khẩu tối thiểu 6 số</p>

                            <input autoComplete="off" type="password" name="oldPassword" className="form-control" placeholder="Mật khẩu cũ" onChange={onChangeData} />
                            <input type="password" name="newPassword" className="form-control" required="required" placeholder="Mật khẩu mới" onChange={onChangeData} />
                            <input type="password" name="enterPassword" className="form-control" required="required" placeholder="Nhập lại mật khẩu" onChange={onChangeData} />

                        </div>

                    </div>
                    <div className={styles.button_submit}>
                        <button type="button" className={styles.cancel} onClick={onModalChangePass}>Hủy</button>
                        <button type="button" class={styles.continue}>Tiếp tục</button>
                    </div>


                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalEditPassWord
