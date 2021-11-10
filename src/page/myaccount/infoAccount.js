import React, { useContext, useState } from 'react'
import styles from './styles.module.scss';
import { Row, Col } from 'reactstrap';
import { FaUser } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import { AiOutlineMail, AiFillInfoCircle, AiFillLock, AiFillPhone, AiOutlineEdit } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import ModalEditPassWord from '../../library/modal/modalEditPassWord';

import { PublicContext } from '../../publicContexts/contexts';


const InfoAccount = ({ setActiveModalEdit }) => {
    const [activeModalChangePassWord, setActiveModalChangePassWord] = useState(false);

    const { infoAccount } = useContext(PublicContext);
    const onActive = () => {
        setActiveModalEdit(true);
    }
    const onModalChangePass = () => {
        setActiveModalChangePassWord(!activeModalChangePassWord);
    }
    return (
        <div className={styles.wap_account}>
            <button onClick={onActive}><i><AiOutlineEdit /></i>Sửa thông tin</button>
            <div className={styles.person_avatar}>
                <img src="/logo/person.jpg" alt="" />
            </div>
            <div className={styles.person_name}>
                <h4>{infoAccount?.numberPhone}</h4>
            </div>
            <Row>
                <Col xs="6">
                    <div className={styles.wap_item}>
                        <Row style={{ width: '100%' }} >
                            <Col xs="2">
                                <i><FaUser className={styles.icon} /></i>
                            </Col>
                            <Col xs="10">
                                <span>Tài khoản</span>
                                <p>{infoAccount?.username}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs="6">
                    <div className={styles.wap_item}>
                        <Row style={{ width: '100%' }}>
                            <Col xs="2">
                                <i><BiUserPin className={styles.icon} /></i>
                            </Col>
                            <Col xs="10">
                                <span>ID</span>
                                <p>*****</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs="6">
                    <div className={styles.wap_item}>
                        <Row style={{ width: '100%' }}>
                            <Col xs="2">
                                <i><AiOutlineMail className={styles.icon} /></i>
                            </Col>
                            <Col xs="10">
                                <span>Email</span>
                                <p>{infoAccount?.email}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs="6">
                    <div className={styles.wap_item}>
                        <Row style={{ width: '100%' }}>
                            <Col xs="2">
                                <i><AiFillInfoCircle className={styles.icon} /></i>
                            </Col>
                            <Col xs="10">
                                <span>Full Name</span>
                                <p>{infoAccount?.fullName}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs="6">
                    <div className={styles.wap_item}>
                        <Row style={{ width: '100%' }}>
                            <Col xs="2">
                                <i><AiFillLock className={styles.icon} /></i>
                            </Col>
                            <Col xs="8">
                                <span>Mật khẩu</span>
                                <p>*********</p>
                            </Col>
                            <Col xs="2" onClick={onModalChangePass}>
                                <i><MdEdit className={`${styles.icon} ${styles.icon_edit}`} /></i>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs="6">
                    <div className={styles.wap_item}>
                        <Row style={{ width: '100%' }}>
                            <Col xs="2">
                                <i><AiFillPhone className={styles.icon} /></i>
                            </Col>
                            <Col xs="10">
                                <span>Số Điện Thoại</span>
                                <p>{infoAccount?.numberPhone}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>

            </Row>
            <ModalEditPassWord activeModalChangePassWord={activeModalChangePassWord} onModalChangePass={onModalChangePass} />
        </div>
    )
}

export default InfoAccount
