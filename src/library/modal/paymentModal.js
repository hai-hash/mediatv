import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import Paypal from '../paypal/paypay';
import { AiOutlineClose } from 'react-icons/ai';

const PaymentModal = ({ activePayment, onPayment }) => {
    const [checkout, setCheckOut] = useState(false);
    const onCloseModal = () => {
        onPayment();
    }
    return (
        <div>
            <Modal
                isOpen={activePayment}
                toggle={onPayment}
                size="lg"
                style={{ maxWidth: '380px' }}
            >
                <ModalBody className={styles.modalBody}>
                    <AiOutlineClose className={styles.btn_close} onClick={onCloseModal} />
                    <p className={styles.titlepaypal}>Nâng cấp tài khoản</p>
                    <div className={styles.moneyPaypal}>
                        <p>Thực hiện nâng cấp tài khoản để có thể xem được nhiều bộ phim hay hơn</p>
                        <p className={styles.price}>Gía ưu đãi : 15$</p>
                    </div>

                    <button className={styles.zalo}><img src="/logo/zalo.svg" alt="" /></button>
                    <button className={styles.momo}>momo</button>

                    {checkout ? (
                        <div className={styles.displayPaypal}>
                            <Paypal onPayment={onPayment} />
                        </div>
                    ) : (
                        <button className={styles.paypal}
                            onClick={() => {
                                setCheckOut(true);
                            }}
                        >
                            <img src="/logo/paypal.svg" alt="" />
                        </button>
                    )}

                </ModalBody>
            </Modal>
        </div>
    )
}

export default PaymentModal
