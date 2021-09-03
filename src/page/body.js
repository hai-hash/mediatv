import Home from "./home/home";
import styles from './styles.module.scss';
import Banner from './home/components/banner'
import NavSub from "../library/navSub/navsub";
const Body = () =>{
    return(
        <>
        <div style={{background:"#ccc"}}>
        <div className={styles.container}>
            <Banner/>
            <div className={styles.container_main}>

            <div className={styles.container_left}>
            <Home/>
            </div>

            <div className={styles.container_right}>
                <NavSub/>
            </div>
            </div>
           
        </div>
        </div>
      
        </>
    );
}
export default Body;