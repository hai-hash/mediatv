import React, { useState, useContext } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import { AiOutlineClose, AiFillCamera } from 'react-icons/ai';
import { Row, Col } from 'reactstrap';
import { PublicContext } from '../../publicContexts/contexts';
import accountApi from '../../api/account/accountApi';
import * as notifys from './../toast/toast';
const ModalEditInfo = ({ activeModalEdit, onEditInfo }) => {
    const { infoAccount, setInfoAccount } = useContext(PublicContext);
    const [data, setData] = useState({ username: infoAccount?.username, fullName: infoAccount?.fullName, email: infoAccount?.email, numberPhone: infoAccount?.numberPhone });
    const onChangeData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }
    const onSubmit = () => {
        const updateInfoAccount = async () => {
            try {
                const res = await accountApi.updateInfoAccount(infoAccount.username, data);
                setInfoAccount({ ...infoAccount, fullName: data?.fullName, email: data?.email, numberPhone: data?.numberPhone });
                const newData = { ...infoAccount, fullName: data?.fullName, email: data?.email, numberPhone: data?.numberPhone };
                localStorage.setItem("user", JSON.stringify(newData));
                console.log(res);
                notifys.notifyInfo("Cập nhật tài khoản thành công !!.");
            } catch (error) {
                console.log(error)
                notifys.notifyError("Cập nhật tài khoản thất bại !!.");
            }
        }
        updateInfoAccount();
        onEditInfo();
    }
    return (
        <div>
            <Modal
                isOpen={activeModalEdit}
                toggle={onEditInfo}
                size="lg"
                style={{ maxWidth: '780px', borderRadius: '10px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <div className={`${styles.content} ${styles.content_login}`}>
                        <AiOutlineClose className={styles.btn_close} onClick={onEditInfo} />
                        <div className={styles.header_update_account}></div>
                        <div className={styles.person_avatar}>
                            <img src="/logo/person.jpg" alt="" />
                            <div className={styles.camera}>
                                <label style={{ cursor: 'pointer' }}>
                                    <AiFillCamera ></AiFillCamera>
                                    <input type="file" name="uplaodImage" style={{ display: 'none' }} />
                                </label>
                            </div>

                        </div>

                        <div className={styles.body_update_info}>
                            <div className={styles.wap_info}>
                                <Row>
                                    <Col xs='6'>
                                        <span>Tài khoản</span>
                                        <input autoComplete="off" type="text" name="username" value={data?.username} disabled />
                                    </Col>
                                    <Col xs='6'>
                                        <span>Full Name</span>
                                        <input autoComplete="off" type="text" name="fullName" value={data?.fullName} onChange={onChangeData} />
                                    </Col>
                                    <Col xs='6'>
                                        <span>Số điện thoại</span>
                                        <input autoComplete="off" type="text" name="numberPhone" value={data?.numberPhone} onChange={onChangeData} />
                                    </Col>
                                    <Col xs='6'>
                                        <span>Email</span>
                                        <input autoComplete="off" type="text" name="email" value={data?.email} onChange={onChangeData} />
                                    </Col>
                                </Row>
                                <button onClick={onSubmit}>Cập nhật</button>
                            </div>

                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalEditInfo
