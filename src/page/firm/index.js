import styles from './styles.module.scss'
import { useState } from 'react'
const Firm = () =>{
    const [urlCurren,setUrlCurren] = useState("https://www.youtube.com/embed/AeaD3Q-bFjU");
    const [chap,setChap] = useState([
        {
            namechap: "Tập 1",
            url: "https://www.youtube.com/embed/AeaD3Q-bFjU",
        },
        {
            namechap: "Tập 2",
            url: "https://youtube.com/embed/mOUQwVUO4q0",
        },
        {
            namechap: "Tập 3",
            url: "https://www.youtube.com/embed/tzv86xibN6s",
        },
        {
            namechap: "Tập 4",
            url: " https://www.youtube.com/embed/puHNx_44koE",
        },
       
        
    ])
    const onNextChap = (url) =>{
        setUrlCurren(url);
    }


    const onDisplayChap = () =>{
        let result = null;
        if(chap.length > 0){
            result = chap.map((cha,index) =>{
                return  <p key={index} onClick={() => onNextChap(cha.url)}>{cha.namechap}</p>
            })
        }
        return result;
    }
    return (
        <div>
            {/* <iframe src="https://drive.google.com/file/d/1fYDtEv21CAqLG4VUVH3T4C4hBLRu8qF4/preview" width="640" height="480" allow="autoplay"></iframe> */}
            <iframe style={{marginTop:"44px"}} width="785" height="480" src={urlCurren} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
            <div className={styles.list_chap}>Danh sách tập</div>
            <div className={styles.chap}>
                {onDisplayChap()}
            </div>
        </div>
    )
}
export default Firm;