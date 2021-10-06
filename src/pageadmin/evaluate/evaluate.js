import React, { useState } from 'react'
import EvaluateDisplay from './evaluateDisplay'
import styles from './styles.module.scss';
import * as types from './../../handler/evaluate/evaluateType';
import EvaluateAdd from './evaluateAdd';
const Evaluate = () => {
    const [status, setStatus] = useState(types.DISPLAY);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <EvaluateDisplay setStatus={setStatus} />
            default:
                return <EvaluateDisplay />
        }
    }
    // const onAdd = () => {
    //     if (status === types.DISPLAY)
    //         setStatus(types.ADD)
    //     else setStatus(types.DISPLAY)
    // }
    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>api / admin / Evaluate </span>
                    <h5>Evaluate</h5>
                </div>
                <div className={styles.url_right}>
                    <button>Evaluate</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default Evaluate
