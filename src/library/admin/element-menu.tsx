import React, { useState } from 'react'
import styles from './styles.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { AiFillHome, AiFillSwitcher, AiOutlineComment, AiFillEye } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
interface Props {
    item: any
}
export default function ElementMenu({ item }: Props) {
    const [active, setActive] = useState(false);

    const onActive = () => {
        setActive(!active);
    }
    const DisplayItem = () => {
        let result = null;
        if (item.element.length > 0) {
            result = item.element.map((i: any, index: any) => {
                return <Link className={styles.toLink} to={i.url} key={index}><li>{i.title}</li></Link>
            })
        }
        return result;
    }
    const DisplayIcon = () => {
        if (item.element.length > 0) {
            if (active) return <AiFillCaretUp />
            else return <AiFillCaretDown />
        }
    }
    const DisplayMainIcon = () => {
        if (item.icon === "AiFillHome") return <AiFillHome />
        else if (item.icon === "AiFillSwitcher") return <AiFillSwitcher />
        else if (item.icon === "MdAccountCircle") return <MdAccountCircle />
        else if (item.icon === "AiOutlineComment") return <AiOutlineComment />
        else if (item.icon === "AiFillEye") return <AiFillEye />
        else return null;
    }
    return (
        <div className={styles.element}>
            <div className={styles.title}>
                <div className={styles.icon}>{DisplayMainIcon()}</div>
                <h5>{item.title}</h5>
                <span onClick={onActive}>
                    {DisplayIcon()}
                </span>
            </div>

            <ul className={`${styles.element_menu} ${active ? styles.active : ''}`}>
                {DisplayItem()}
            </ul>
        </div>
    )
}


