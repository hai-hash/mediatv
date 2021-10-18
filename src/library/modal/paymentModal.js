import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import Paypal from '../paypal/paypay';

const PaymentModal = ({ activePayment, onPayment }) => {
    const [checkout, setCheckOut] = useState(false);
    return (
        <div>
            <Modal
                isOpen={activePayment}
                toggle={onPayment}
                size="lg"
                style={{ maxWidth: '518px' }}
            >
                <ModalBody className={styles.modalBody}>
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
