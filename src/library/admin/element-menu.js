import React,{useState} from 'react'
import styles from './styles.module.scss';
import { AiFillCaretDown,AiFillCaretUp } from "react-icons/ai";
import {AiFillHome,AiFillSwitcher} from "react-icons/ai";
import {MdAccountCircle} from "react-icons/md";
import {Link} from "react-router-dom";
export default function ElementMenu({item}){
    const [active, setActive] = useState(false);

    const onActive = () =>{
        setActive(!active);
    }
    const DisplayItem = () =>{
        let result = null;
        if(item.element.length > 0){
            result = item.element.map((i,index)=> {
                return <Link className={styles.toLink} to={i.url} key={index}><li>{i.title}</li></Link> 
            })
        }
        return result;
    }
    const DisplayIcon = () =>{
        if(item.element.length > 0){
            if(active) return <AiFillCaretUp/>
            else return <AiFillCaretDown/>
        }
    }
    const DisplayMainIcon=()=>{
        if(item.icon === "AiFillHome") return <AiFillHome/>
        else if(item.icon === "AiFillSwitcher") return <AiFillSwitcher/>
        else if(item.icon === "MdAccountCircle") return <MdAccountCircle/>
        else return null;
    }
    return (
        <div className={styles.element}>
            <div  className={styles.title}>
            <div className={styles.icon}>{DisplayMainIcon()}</div>
            <h5>{item.title}</h5>
            <span  onClick={onActive}>
            {DisplayIcon()}
            </span>
            </div>
           
            <ul className={`${styles.element_menu} ${active ? styles.active : ''}`}>
            {DisplayItem()}
            </ul>
        </div>
    )
}


