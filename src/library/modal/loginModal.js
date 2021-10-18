import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { PublicContext } from '../../publicContexts/contexts';
import accountApi from '../../api/account/accountApi';
import * as toasis from './../toast/toast';

const LogInModal = ({ activeSignIn, onSignIn }) => {
    const [dataForm, setDataForm] = useState({ username: "", password: "" })

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
                toasis.notifySuccess("đăng nhập thành công");

            } catch (error) {
                console.log("Failed to fetch sign in :", error);
                toasis.notifyError("Tài khoản hoặc mật khẩu không chính xác");
            }
        }

        fetchSignIn();
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
                    <div className={styles.content} style={{ background: 'url("https://media.istockphoto.com/videos/defocused-particles-background-loop-video-id932483108?b=1&k=6&m=932483108&s=640x640&h=HAwn4USIw_AF3MuWG3E87XQNYCz7MYLq3sWPn7KDNss=")' }}>
                        <span><img src="/logo/logo2.png" alt="" /></span>
                        <p className={styles.title}>Đăng Nhập</p>

                        <form onSubmit={onSubmitForm}>
                            <div className={styles.line_info}>
                                <input name="username" type="text" className="form-control" placeholder="Tên tài khoản" required onChange={onChangeForm} />
                            </div>
                            <div className={styles.line_info}>
                                <input name="password" type="password" className="form-control" placeholder="Mật Khẩu" required onChange={onChangeForm} />
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
