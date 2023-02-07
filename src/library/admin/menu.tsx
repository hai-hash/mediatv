
import React from 'react'
import styles from './styles.module.scss';
import ElementMenu from './element-menu';
import {menu} from '../../constant/common';

const Menu = () =>{
    const DisplayMenu = () =>{
        let result = null;
        if(menu.length > 0){
            result = menu.map((item,index) =>{
                return <ElementMenu key={index} item={item}/>
            })
        }
        return result;
    }
    return (
        <div className={styles.wap_menu}>
            <img src="/logo/top_logo.jpg" alt=""/>
            {DisplayMenu()}
        </div>
    )
}
export default Menu;
