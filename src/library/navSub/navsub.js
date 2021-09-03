import styles from "./styles.module.scss"
import NavItem from "./components/navitem";
import { useState,useEffect } from "react";
const NavSub = () =>{
    const [active,setActive] = useState(true);
    const arr= [1,2,3,4,5,6,7,8,9,10]
    const arr1 = [1,2,3,4,5]
    useEffect(() => {
       console.log("đã thay doi")
    }, [active])

    const display = (active) =>{
        var result = null;
        if(active === true){
        if(arr.length > 0){
            result = arr.map((slide,index) =>{
                return (
                    <NavItem key={index}/>
                )
            })
        }
        }
        else{
            if(arr1.length > 0){
                result = arr1.map((slide,index) =>{
                    return (
                        <NavItem key={index}/>
                    )
                })
            }
        }
        return result;
      }
      const seriesMoved = () =>{
        if(active === false) setActive(true);
      }
      const oddMovied = () =>{
        if(active === true) setActive(false);
      }

    return (
        <>
        <div className={styles.rank}>BẢNG XẾP HẠNG</div>
        <div className={styles.button_navsub}>
            <button onClick={seriesMoved}>Phim bộ</button>
            <button onClick={oddMovied}>Phim lẻ</button>
           
        </div>
        {display(active)}
        <div className={styles.rank}>PHIM SẮP CHIẾU</div>
        { display(active)}

        </>
    )
}
export default NavSub;