import React, { useState } from 'react'
import * as types from './../../handler/historytransaction/typeHistoryTransaction';
import styles from './styles.module.scss';
import HistoryDisplay from './historyDisplay';

const HistoryTransaction = () => {
    const [status] = useState(types.DISPLAY);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <HistoryDisplay />
            default:
                return <HistoryDisplay />
        }
    }

    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / history transaction </span>
                    <h5>history transaction</h5>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default HistoryTransaction
