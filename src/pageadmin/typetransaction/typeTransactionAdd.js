import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
import * as toasts from './../../library/toast/toast';
import transactionApi from '../../api/transaction/transactionApi';
const TypeTransactionAdd = () => {
    const [data, setdata] = useState({ nameTypeTransaction: "" });

    const onChangeData = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setdata({ ...data, [name]: value })

    }

    const onSaveFilm = (e) => {
        e.preventDefault();
        const fetchCreateCategory = async () => {
            try {
                const res = await transactionApi.createNewTypeTransaction(data);
                console.log(res);
                toasts.notifySuccess("Thêm hình thức thanh toán thành công");
            } catch (error) {
                console.log(error);
                toasts.notifyError("Thêm hình thức thanh toán thất bại");
            }
        }

        fetchCreateCategory();
    }
    return (
        <div className={styles.form} onSubmit={onSaveFilm}>

            <form>
                <Row>
                    <Col className={styles.col}>
                        <div className="form-group">
                            <input required name="nameTypeTransaction" type="text" className="form-control" placeholder="nameCategory" onChange={onChangeData} />
                        </div>
                    </Col >
                </Row>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default TypeTransactionAdd
