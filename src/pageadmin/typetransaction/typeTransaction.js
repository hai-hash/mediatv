import React, { useState } from 'react'
import * as types from './../../handler/typetransaction/typetransaction';
import styles from './styles.module.scss';
import TypeTransactionDisplay from './typeTransactionDisplay';
import TypeTransactionAdd from './typeTransactionAdd';

const TypeTransaction = () => {
    const [status, setStatus] = useState(types.DISPLAY);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <TypeTransactionDisplay />
            case types.ADD:
                return <TypeTransactionAdd />
            default:
                return <TypeTransactionDisplay />
        }
    }
    const onAdd = () => {
        if (status === types.DISPLAY)
            setStatus(types.ADD)
        else setStatus(types.DISPLAY)
    }
    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / type transaction </span>
                    <h5>type transaction</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Type</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default TypeTransaction
