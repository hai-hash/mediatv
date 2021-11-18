import React, { useEffect, useState } from 'react';
import Layout from '../../library/layout/layout';
import styles from './styles.module.scss';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import MenuAccount from './menuAccount';
import InfoAccount from './infoAccount';
import { useHistory } from 'react-router-dom';
import * as types from './../../handler/profile/profile';
import NotifyProfile from './notifyProfile';
import TransactionProfile from './transactionProfile';
import HistoryViewProfile from './historyViewProfile';
import ModalEditInfo from '../../library/modal/modalEditInfo';
import { useParams } from "react-router-dom";
const AccountLayout = () => {
    const history = useHistory();
    const [status, setStatus] = useState(types.PROFILE);
    const [activeModalEdit, setActiveModalEdit] = useState(false);
    let { type } = useParams();
    const onEditInfo = () => {
        setActiveModalEdit(!activeModalEdit);
    }
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            history.push('/home');
        }
        if (type) {
            setStatus(type);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const genData = () => {
        if (status === types.PROFILE) return <InfoAccount setActiveModalEdit={setActiveModalEdit} />
        else if (status === types.NOTIFY) return <NotifyProfile />
        else if (status === types.HISTORYTRANSACTION) return <TransactionProfile />
        else return <HistoryViewProfile />
    }
    return (
        <div style={{ background: '#000' }}>
            <Layout />
            <div className={styles.container}>
                <Row>
                    <Col xs="4">
                        <MenuAccount setStatus={setStatus} />
                    </Col>
                    <Col xs="8">
                        {genData()}
                    </Col>
                </Row>
            </div>
            <ModalEditInfo activeModalEdit={activeModalEdit} onEditInfo={onEditInfo} />
        </div>
    )
}

export default AccountLayout
