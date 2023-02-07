import FilmDisplay from './firmdisplay';
import React, { useState } from 'react'
import styles from './styles.module.scss';
import FilmAdd from './filmadd';
import * as types from '../../handler/video/typeFilm';
import DetailFilm from './detail';
import FilmEdit from './filmEdit';
import FilmUtils from './utils/film.utils';
const Film = () =>{
    const [status, setStatus] = useState<String>(types.DISPLAY);
    const [id, setId] = useState(0);
    const genData = () => {
        switch (status) {
            case types.DISPLAY:
                return <FilmDisplay setStatus={setStatus} setId={setId} />
            case types.ADD:
                return <FilmAdd />
            case types.Detail:
                return <DetailFilm id={id} />
            case types.EDIT:
                return <FilmEdit />

            default:
                return <FilmDisplay setStatus={setStatus} setId={setId}/>
        }
    }
    const onAdd = () => {
        if (status === types.DISPLAY)
            setStatus(types.ADD)
        else if (status === types.Detail)
            setStatus(types.ADD)
        else setStatus(types.DISPLAY)
    }
    return (
        <div>
            <div className={styles.url}>
                <div className={styles.url_left}>
                    <span>admin/firm</span>
                    <h5>Film</h5>
                </div>
                <div className={styles.url_right}>
                    <button onClick={onAdd}>Thêm Film</button>
                </div>
            </div>
            {genData()}
        </div>
    )
}
export default Film;

