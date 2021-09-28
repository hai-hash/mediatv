import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import accountApi from '../../api/account/accountApi';
import firebase from '../firebase/firebaseConfig';
const LogUpModal = ({ activeSignUp, onSignUp, setDataFormSignUp, setActiveFireBase }) => {
    const [dataForm, setDataForm] = useState({ fullName: "", email: "", numberPhone: "", username: "", password: "" })
    const onChangeForm = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setDataForm({ ...dataForm, [name]: value });
    }


    // const customNumberPhone = () => {
    //     let numberPhone = dataForm.numberPhone.slice(1);

    //     return "+84" + numberPhone;
    // }

    const onSubmitForm = (event) => {
        event.preventDefault();
        setDataFormSignUp(dataForm);
        // figureCapcha();
        // var numberPhone = customNumberPhone(dataForm.numberPhone);
        // console.log("đây là số điện thoại", numberPhone);
        // const appVerifier = window.recaptchaVerifier;
        // firebase.auth().signInWithPhoneNumber(numberPhone, appVerifier)
        //     .then((confirmationResult) => {
        //         window.confirmationResult = confirmationResult;
        //         console.log("Sending DTO ...")
        //         onSignUp();
        //         setActiveFireBase(true);
        //     }).catch((error) => {
        //         console.log("can not send to numberPhone :", error)
        //     });


        const fetchSignUp = async () => {
            try {
                const params = dataForm;
                const res = await accountApi.signup(params)
                console.log(res);
                alert("đăng ký thành công");
            } catch (error) {
                console.log("Failed to fetch sign up :", error);
                alert("Tên tài khoản đã tồn tại");
            }
        }

        fetchSignUp();
    }

    // const figureCapcha = () => {
    //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //         'size': 'invisible',
    //         'callback': (response) => {
    //             // reCAPTCHA solved, allow signInWithPhoneNumber.
    //             onSubmitForm();
    //         },
    //         defaultCountry: "IN"
    //     });
    // }
    return (
        <div>
            <Modal
                isOpen={activeSignUp}
                toggle={onSignUp}
                size="lg"
                style={{ maxWidth: '518px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={styles.content}>
                        <span><img src="/logo/logo2.png" alt="" /></span>
                        <p className={styles.title}>Đăng ký</p>

                        <form onSubmit={onSubmitForm}>
                            <div className={styles.line_info}>
                                <input name="fullName" type="text" className="form-control" placeholder="Họ Và Tên" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="email" type="text" className="form-control" placeholder="Email" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="numberPhone" type="text" className="form-control" placeholder="Số Điện Thoại" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="username" type="text" className="form-control" placeholder="Tên tài khoản" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="password" type="text" className="form-control" placeholder="Mật Khẩu" required onChange={onChangeForm} />
                            </div>
                            <div id="sign-in-button"></div>
                            <button className="btn btn-primary">Tiếp Tục</button>
                        </form>

                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LogUpModal
