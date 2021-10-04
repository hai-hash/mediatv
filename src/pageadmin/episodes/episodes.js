import React, { useState } from 'react'
import EpisodeDisplay from './episodeDisplay';
import * as types from './../../handler/episode/episodeType';
import styles from './styles.module.scss';
import EpisodeAdd from './episodeAdd';
import EpisodeEdit from './episodeEdit';
const EpisodesAdmin = () => {
    const [status, setStatus] = useState(types.DISPLAY);

    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <EpisodeDisplay setStatus={setStatus} />
            case types.ADD:
                return <EpisodeAdd />
            case types.EDIT:
                return <EpisodeEdit />
            default:
                return <EpisodeDisplay />
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
                    <span>api / admin / episode </span>
                    <h5>Category</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Episode</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}

export default EpisodesAdmin
