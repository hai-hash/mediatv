import React, { useState } from 'react';
import * as types from './../../handler/account/accountType';
import styles from './styles.module.scss';
import AccountDisPlay from './accountDisplay';
import AccountEdit from './accountEdit';
import AccountAdd from './accountAdd';

const Account = () => {
    const [status, setStatus] = useState(types.DISPLAY);

    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <AccountDisPlay setStatus={setStatus} />
            case types.ADD:
                return <AccountAdd />
            case types.EDIT:
                return <AccountEdit />

            default:
                return <AccountDisPlay setStatus={setStatus} />
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
                    <span>api / admin / account </span>
                    <h5>Account</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Account</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default Account
