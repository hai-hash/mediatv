import React, { useState } from 'react';
import styles from './styles.module.scss';
import * as types from './../../handler/view/viewType';
import ViewDisplay from './viewDisplay';
import ViewEdit from './viewEdit';
const ViewAdmin = () => {
    const [status, setStatus] = useState(types.DISPLAY);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <ViewDisplay setStatus={setStatus} />
            case types.EDIT:
                return <ViewEdit />


            default:
                return <ViewDisplay />
        }
    }
    const onComeBack = () => {
        setStatus(types.DISPLAY)
    }
    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / view </span>
                    <h5>view</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onComeBack}>Quay lại</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default ViewAdmin
