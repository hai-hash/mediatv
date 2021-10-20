import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { PublicContext } from '../../publicContexts/contexts';
import accountApi from '../../api/account/accountApi';
import * as toasis from './../toast/toast';
import LogUpModal from './logupModal';
import { AiOutlineClose } from 'react-icons/ai';
import ForgetPassWordModal from './forgetPassWordModal';

const LogInModal = ({ activeSignIn, onSignIn }) => {
    const [dataForm, setDataForm] = useState({ username: "", password: "" })
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [activeForgetPassWordModal, setActiveForgetPassWordModal] = useState(false);
    const onForget = () => {
        setActiveForgetPassWordModal(!activeForgetPassWordModal);
    }
    const onSignUp = () => {
        setActiveSignUp(!activeSignUp);
    }

    const history = useHistory();

    const { setIdToken, setInfoAccount, setIsLogin } = useContext(PublicContext);

    const onChangeForm = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setDataForm({ ...dataForm, [name]: value });
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        const fetchSignIn = async () => {
            try {
                const params = dataForm;
                const res = await accountApi.signin(params)
                setInfoAccount(res);
                setIdToken(res?.token)
                setIsLogin(true);
                localStorage.setItem("user", JSON.stringify(res));
                localStorage.setItem("token", res?.token);
                history.push("/home");
                onSignIn();
                if (res?.role === "ADMIN") {
                    history.push("/admin")
                }
                toasis.notifySuccess("Đăng nhập thành công !.");

            } catch (error) {
                console.log("Failed to fetch sign in :", error);
                toasis.notifyError("Tài khoản hoặc mật khẩu không chính xác !.");
            }
        }

        fetchSignIn();
    }
    const onRegister = () => {
        onSignIn();
        setActiveSignUp(true);
    }
    const onCloseModal = () => {
        onSignIn();
    }
    const onOpenModalForgetPassWord = () => {
        onSignIn();
        setActiveForgetPassWordModal(true);
    }
    return (
        <div>
            <Modal
                isOpen={activeSignIn}
                toggle={onSignIn}
                size="lg"
                style={{ maxWidth: '380px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={`${styles.content} ${styles.content_login}`}>
                        <AiOutlineClose className={styles.btn_close} onClick={onCloseModal} />
                        <span><img src="/logo/logo2.png" alt="" /></span>
                        <p className={styles.title}>Đăng Nhập</p>

                        <form onSubmit={onSubmitForm}>
                            <div className={styles.line_info}>
                                <input name="username" type="text" className="form-control" placeholder="Tên tài khoản" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="password" type="password" className="form-control" placeholder="Mật Khẩu" required onChange={onChangeForm} />
                            </div>
                            <button className="btn">Đăng Nhập</button>
                        </form>
                        <p className={styles.forgetPassword} onClick={onOpenModalForgetPassWord}>Quên mật khẩu</p>
                        <p className={styles.or}>hoặc</p>
                        <button className={styles.btn_facebook}>Facebook</button>
                        <button className={styles.btn_google}>Google</button>
                        <div className={styles.footer_login}>
                            <p>Chưa có tài khoản?</p>
                            <p className={styles.register} onClick={onRegister}>Đăng ký ngay</p>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
            <LogUpModal activeSignUp={activeSignUp} onSignUp={onSignUp} />
            <ForgetPassWordModal activeForgetPassWordModal={activeForgetPassWordModal} onForget={onForget} />
        </div>
    )
}

export default LogInModal
