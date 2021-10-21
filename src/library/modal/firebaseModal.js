import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
// import accountApi from '../../api/account/accountApi';
const FireBaseModal = ({ activeFireBase, onFireBase, dataFormSignUp }) => {
    const [dataForm, setDataForm] = useState({ verify: "" })
    // console.log("this firebase:", dataFormSignUp);
    const onChangeForm = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setDataForm({ ...dataForm, [name]: value });
    }
    const onSubmitForm = (event) => {
        event.preventDefault();
        // const fetchSignUp = async () => {
        //     try {
        //         const params = dataFormSignUp;
        //         const res = await accountApi.signup(params)
        //         console.log(res);
        //         alert("đăng ký thành công");
        //     } catch (error) {
        //         console.log("Failed to fetch sign up :", error);
        //         alert("Tên tài khoản đã tồn tại");
        //     }
        // }
        // const code = dataForm.verify;
        // window.confirmationResult.confirm(code).then((result) => {
        //     const user = result.user;
        //     console.log(JSON.stringify(user));
        //     fetchSignUp();
        //     alert("Xác nhận mã thành công");
        //     onFireBase();
        // }).catch((error) => {
        //     console.log(error);
        //     alert("Xác nhận thất bại")
        // });

    }
    return (
        <div>
            <Modal
                isOpen={activeFireBase}
                toggle={onFireBase}
                size="lg"
                style={{ maxWidth: '518px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={styles.content}>
                        <span><img src="/logo/logo2.png" alt="" /></span>
                        <p className={styles.title}>Đăng Ký</p>
                        <p>Mã xác nhận đã được gửi về số điện thoại</p>

                        <form onSubmit={onSubmitForm}>
                            <div className={styles.line_info}>
                                <input name="verify" type="text" className="form-control" placeholder="Mã xác nhận" required onChange={onChangeForm} />
                            </div>
                            <button className="btn btn-primary">Xác Nhận</button>
                        </form>

                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default FireBaseModal
