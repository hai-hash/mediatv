import styles from './styles.module.scss'
import { useState ,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import VideoUtils from './../../handler/video/video.utils'

const Firm = () =>{
    const [urlCurren,setUrlCurren] = useState("https://www.youtube.com/embed/AeaD3Q-bFjU");
    const [chap,setChap] = useState([])
    const {getFirmCurren,firmCurren} = VideoUtils();
    const onNextChap = (url) =>{
        setUrlCurren(url);
    }
    let { id } = useParams();

    useEffect(() => {
       getFirmCurren(id)   
    }, [])

    useEffect(() => {
        if(firmCurren){
        setChap(firmCurren.firm)   
        }
     }, [firmCurren])

     
    useEffect(() => {
        if(firmCurren && firmCurren.firm){
        setUrlCurren(firmCurren.firm[0].url);
        }
     }, [chap])



    const onDisplayChap = () =>{
        let result = null;
        if(chap.length > 0){
            result = chap.map((cha,index) =>{
                return  <p key={index} style={{backgroundColor: urlCurren === cha.url ? "rgb(177, 135, 216)" : "#ccc"}} onClick={() => onNextChap(cha.url)}>{cha.namechap}</p>
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