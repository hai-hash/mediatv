import React,{useState} from 'react'
import styles from './styles.module.scss';
import { AiOutlineEdit,AiFillFileText } from 'react-icons/ai';

export default function ItemFirm({film,changeActiveFilm,changeHotFilm}){
    const [hot,setHot] = useState(film?.hot);
    const [active,setActive] = useState(film?.active);
    const onHot = () =>{
        setHot(!hot);
        changeHotFilm(film?.id)
    }
    const onActive = () =>{
        setActive(!active);
        changeActiveFilm(film?.id)
    }
    return (
            <tr>
                <th scope="row">{film?.id}</th>
                <td>{film?.nameFilm}</td>
                <td>{film?.createDate}</td>
                <td>Danchoi9x</td>
                <td>{film?.countView}</td>
                <td className={hot ? styles.hot : styles.nhot} onClick={onHot}>Hot</td>
                <td className={active ? styles.hot : styles.nhot} onClick={onActive}>Hoạt động</td>
                <td className={styles.action}>
                    <button className={styles.edit}><AiOutlineEdit/></button>
                    <button className={styles.detail}><AiFillFileText/></button>
                </td>
         </tr>
      
    )
}
