import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import styles from './styles.module.scss';
import Paypal from '../paypal/paypay';
import { AiOutlineClose } from 'react-icons/ai';

const PaymentModal = ({ activePayment, onPayment }) => {
    const [checkout, setCheckOut] = useState(false);
    const [money, setMoney] = useState(15);
    const [month, setMonth] = useState(1);
    const onCloseModal = () => {
        onPayment();
    }
    const onChangeValue = (e) => {
        let month = parseInt(e.target.value);
        setMonth(month);
        setCheckOut(false);
        if (month === 1) setMoney(15);
        if (month === 3) setMoney(25);
        if (month === 12) setMoney(144);

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
                        <p className={styles.price}>{money}$</p>
                        <div className={styles.month}>
                            <div className={styles.select_month}>
                                <label>1 tháng</label>
                                <input type="radio" name="month" value="1" checked={month === 1} onChange={onChangeValue} />
                            </div >
                            <div className={styles.select_month}>
                                <label>3 tháng</label>
                                <input type="radio" name="month" value="3" checked={month === 3} onChange={onChangeValue} />
                            </div>
                            <div className={styles.select_month}>
                                <label>1 năm</label>
                                <input type="radio" name="month" value="12" checked={month === 12} onChange={onChangeValue} />
                            </div>
                        </div>



                    </div>

                    <button className={styles.zalo}><img src="/logo/zalo.svg" alt="" /></button>
                    <button className={styles.momo}>momo</button>

                    {checkout ? (
                        <div className={styles.displayPaypal}>
                            <Paypal onPayment={onPayment} month={month} moneyPayment={money} />
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
