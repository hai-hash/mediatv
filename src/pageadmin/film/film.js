import FilmDisplay from './firmdisplay';
import React,{useState} from 'react'
import styles from './styles.module.scss';
import FilmAdd from './filmadd';
import * as types from './../../handler/video/typeFilm';
export default function Film(){
    const [status,setStatus] = useState(types.DISPLAY);
    const genData = () =>{
        switch (status) {
            case types.DISPLAY:
                return  <FilmDisplay/>
            case types.ADD:
                return <FilmAdd/>
        
            default:
                return  <FilmDisplay/>
        }
    }
    const onAdd = () =>{
        if(status === types.DISPLAY)
        setStatus(types.ADD)
        else  setStatus(types.DISPLAY)
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

