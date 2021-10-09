import React, { useState } from 'react';
import * as types from './../../handler/country/countryType';
import styles from './styles.module.scss';
import CountryDisplay from './countryDisplay';
import CountryAdd from './countryAdd';
import CountryEdit from './countryEdit';

const Country = () => {
    const [status, setStatus] = useState(types.DISPLAY);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <CountryDisplay setStatus={setStatus} />
            case types.ADD:
                return <CountryAdd />
            case types.EDIT:
                return <CountryEdit />

            default:
                return <CountryDisplay />
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
                    <span>api / admin / country </span>
                    <h5>Country</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Country</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default Country
