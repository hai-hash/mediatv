
import React from 'react'
import styles from './styles.module.scss';
import ElementMenu from './element-menu';
import MenuUtils from './menu-utils';

export default function Menu(){
   const {menu} = MenuUtils();
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
