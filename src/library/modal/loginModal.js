import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { PublicContext } from '../../publicContexts/contexts';
import accountApi from '../../api/account/accountApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogInModal = ({ activeSignIn, onSignIn }) => {
    const [dataForm, setDataForm] = useState({ username: "", password: "" })

    const history = useHistory();

    const notify = () => toast("Wow so easy!");

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
                notify();
                onSignIn();
                if (res?.role === "ADMIN") {
                    history.push("/admin")
                }

            } catch (error) {
                console.log("Failed to fetch sign in :", error);
                alert("Tài khoản hoặc mật khẩu không chính xác");
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
